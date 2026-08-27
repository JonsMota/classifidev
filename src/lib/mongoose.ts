import mongoose from 'mongoose'

// Para evitar warnings de depreciação do Mongoose
mongoose.set('strictQuery', true)

// 1. Definimos uma interface para o nosso objeto de cache
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

/**
  Na conexão com o banco de dados em um ambiente serverless a
  melhor prática é armazenar a conexão em cache em uma variável global
  para que ela possa ser reutilizada entre as invocações da função,
  em vez de abrir uma nova conexão a cada requisição.
 */
const globalWithMongoose = global as typeof global & {
  mongoose: MongooseCache
}

let cached = globalWithMongoose.mongoose

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  // Se já temos uma conexão em cache, a usamos.
  if (cached.conn) {
    console.log('Usando conexão de banco de dados em cache')
    return cached.conn
  }

  // Se não há uma promessa de conexão, criamos uma.
  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
      throw new Error('Por favor, defina a variável de ambiente MONGODB_URI dentro de .env.local')
    }

    console.log('Criando nova conexão com o banco de dados')
    // A promessa de conexão é criada e armazenada em cache.
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }

  try {
    // Aguardamos a promessa de conexão ser resolvida e armazenamos a conexão real.
    cached.conn = await cached.promise
  } catch (e) {
    // Se a conexão falhar, limpamos a promessa em cache para tentar novamente depois.
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect

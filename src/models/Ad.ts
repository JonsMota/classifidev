import { Schema, models, model } from 'mongoose'

const AdSchema: Schema = new Schema({
  // Usamos os mesmos nomes de campos da interface Transaction.ts
  name: { type: String, required: [true, 'O nome é obrigatório.'] },
  price: { type: Number, required: [true, 'O preço é obrigatório.'] },
  description: { type: String, required: [true, 'A descrição é obrigatória.'] },
  category: { type: String, required: [true, 'A categoria é obrigatória.'] },
  whatsapp: { type: Number, required: [true, 'O WhatsApp é obrigatório.'] },
  date: { type: Date, default: Date.now } // O banco gerencia a data
})

// Evita que o modelo seja recompilado em cada recarga no modo de desenvolvimento
export default models.Ad || model('Ad', AdSchema)

import { Schema, models, model } from 'mongoose'

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'O primeiro nome é obrigatório.'],
    maxlength: 50
  },
  lastName: {
    type: String,
    required: [true, 'O sobrenome é obrigatório.'],
    maxlength: 50
  },
  user: {
    type: String,
    required: [true, 'O nome de usuário é obrigatório.'],
    maxlength: 30,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    maxlength: 100,
    unique: true,
    // Adicionamos uma validação de formato de email no backend
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, preencha um endereço de email válido.'
    ]
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.']
  }
})

export default models.User || model('User', UserSchema)

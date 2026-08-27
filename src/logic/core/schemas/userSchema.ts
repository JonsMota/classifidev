import Joi from 'joi'

export const userSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'O primeiro nome é obrigatório.'
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'O sobrenome é obrigatório.'
  }),
  user: Joi.string().required().messages({
    'string.empty': 'O nome de usuário é obrigatório.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validação de formato de email
    .required()
    .messages({
      'string.empty': 'O email é obrigatório.',
      'string.email': 'Por favor, insira um email válido.'
    }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'A senha é obrigatória.',
    'string.min': 'A senha deve ter no mínimo 6 caracteres.'
  })
})

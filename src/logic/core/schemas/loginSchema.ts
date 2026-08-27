import Joi from 'joi'

export const loginSchema = Joi.object({
  // O usuário pode fazer login com email ou nome de usuário
  identifier: Joi.string().required().messages({
    'string.empty': 'Email ou nome de usuário é obrigatório.'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'A senha é obrigatória.'
  })
})

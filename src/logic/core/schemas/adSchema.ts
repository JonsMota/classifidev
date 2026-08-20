import Joi from 'joi'

export const adSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome do produto é obrigatório.'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'A categoria é obrigatória.'
  }),
  price: Joi.string()
    .required()
    .pattern(/^(?!R\$\s0,00$).*$/) // Garante que o preço não seja R$ 0,00
    .messages({
      'string.empty': 'O preço é obrigatório.',
      'string.pattern.base': 'O preço não pode ser zero.'
    }),
  whatsapp: Joi.string().min(14).required().messages({ // (XX) XXXXX-XXXX tem 14 caracteres
    'string.empty': 'O WhatsApp é obrigatório.',
    'string.min': 'Por favor, insira um número de WhatsApp válido.'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'A descrição é obrigatória.'
  })
})

import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'
import { hash } from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await dbConnect()

  try {
    const { email, user, password } = req.body

    // A validação de campos vazios agora é tratada pelo Mongoose,
    // tornando o código da API mais limpo.

    const existingUser = await User.findOne({ $or: [{ email }, { user }] })
    if (existingUser) {
      const message =
        existingUser.email === email
          ? 'Este email já está em uso.'
          : 'Este nome de usuário já está em uso.'
      return res.status(409).json({ message })
    }

    const hashedPassword = await hash(password, 12)

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword
    })

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: newUser._id })
  } catch (e: unknown) {
    console.error(e)

    if (e instanceof Error && e.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Dados inválidos. Verifique os campos e tente novamente.' })
    }

    res.status(500).json({ message: 'Erro interno no servidor.' })
  }
}

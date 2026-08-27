import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { stringifySetCookie } from 'cookie'

const SECRET = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  if (!SECRET) {
    return res.status(500).json({ message: 'Chave secreta do servidor não configurada.' })
  }

  await dbConnect()

  const { identifier, password } = req.body

  try {
    // Permite que o usuário faça login com email ou nome de usuário
    const user = await User.findOne({
      $or: [{ email: identifier }, { user: identifier }]
    })

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' })
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Credenciais inválidas.' })
    }

    const token = sign(
      {
        userId: user._id,
        email: user.email,
        firstName: user.firstName
      },
      SECRET,
      { expiresIn: '1h' }
    )

    const serializedCookie = stringifySetCookie({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hora
      path: '/'
    })

    res.setHeader('Set-Cookie', serializedCookie)
    res.status(200).json({ message: 'Login bem-sucedido!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro interno no servidor.' })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { stringifySetCookie } from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const serializedCookie = stringifySetCookie({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/'
  })

  res.setHeader('Set-Cookie', serializedCookie)
  res.status(200).json({ message: 'Logout realizado com sucesso!' })
}

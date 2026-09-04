import type { NextApiRequest, NextApiResponse } from 'next'
import { stringifySetCookie } from 'cookie'

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Autenticação]
 *     summary: Realiza logout
 *     description: Invalida e remove o cookie de sessão do usuário.
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */

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

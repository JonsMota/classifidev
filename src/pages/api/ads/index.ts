import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongoose'
import Ad from '@/models/Ad'
import jwt from 'jsonwebtoken'
import User from '@/models/User' // Importar o modelo User

const SECRET = process.env.JWT_SECRET as string

/**
 * @swagger
 * /api/ads:
 *   get:
 *     tags: [Anúncios]
 *     summary: Lista todos os anúncios (paginados ou todos)
 *     responses:
 *       200:
 *         description: Lista recuperada com sucesso
 *   post:
 *     tags: [Anúncios]
 *     summary: Cria um novo anúncio (Requer Login)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, price, description]
 *             properties:
 *               title: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               image: { type: string }
 *     responses:
 *       201:
 *         description: Anúncio criado
 *       401:
 *         description: Não autorizado
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect() // Garante a conexão com o banco

  switch (req.method) {
    case 'GET': {
      try {
        const token = req.cookies.auth_token
        let userId = null
        let userInfo = null // Inicialização da variável

        // Se existe um token, tentamos decodificá-lo para pegar o ID do usuário
        if (token) {
          try {
            const decoded = jwt.verify(token, SECRET) as { userId: string }
            userId = decoded.userId

            // Busca o usuário no banco para obter o nome.
            const user = await User.findById(userId).select('firstName')
            if (user) {
              userInfo = {
                firstName: user.firstName
              }
            }
          } catch (e) {
            // Token inválido ou expirado, userId continua null.
          }
        }

        const ads = await Ad.find({}).sort({ date: -1 })
        // AGORA RETORNAMOS UM OBJETO: a lista de anúncios E o ID do usuário logado (ou null)
        return res.status(200).json({
          ads,
          userId,
          userInfo
        })
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar anúncios', error })
      }
    }

    case 'POST':
      try {
        // 1. Pegar o token do cookie
        const token = req.cookies.auth_token
        if (!token) {
          return res.status(401).json({ message: 'Não autorizado: token não fornecido.' })
        }

        // 2. Verificar o token e extrair o ID do usuário
        const { userId } = jwt.verify(token, SECRET) as { userId: string }

        // 3. Criar o anúncio, adicionando o userId ao corpo da requisição
        const newAd = await Ad.create({
          ...req.body,
          userId // Salvando o ID do usuário que criou o anúncio.
        })

        return res.status(201).json(newAd)
      } catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
          return res.status(400).json({ message: 'Dados inválidos.', error })
        }
        return res.status(500).json({ message: 'Falha ao criar anúncio', error })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Método ${req.method} não permitido`)
      break
  }
}

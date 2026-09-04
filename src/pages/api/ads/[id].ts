import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongoose'
import Ad from '@/models/Ad'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

/**
 * @swagger
 * /api/ads/{id}:
 *   get:
 *     tags: [Anúncios]
 *     summary: Busca um anúncio pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Detalhes do anúncio }
 *       404: { description: Anúncio não encontrado }
 *   put:
 *     tags: [Anúncios]
 *     summary: Atualiza um anúncio (Requer ser o Dono)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *     responses:
 *       200: { description: Atualizado com sucesso }
 *       403: { description: Proibido (Não é o dono) }
 *   delete:
 *     tags: [Anúncios]
 *     summary: Remove um anúncio (Requer ser o Dono)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Removido com sucesso }
 *       403: { description: Proibido }
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const { id } = req.query // No Pages Router, o id vem do objeto query

  // --- LÓGICA DE AUTENTICAÇÃO ---
  const token = req.cookies.auth_token
  if (!token) {
    return res.status(401).json({ message: 'Não autorizado: token não fornecido.' })
  }

  let loggedInUserId: string
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string }
    loggedInUserId = decoded.userId
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' })
  }
  // --- FIM DA LÓGICA DE AUTENTICAÇÃO ---

  // Se passou pela autenticação, o usuário está logado.
  // A autorização (verificação de propriedade) será feita na própria query do DB.
  switch (req.method) {
    case 'GET': {
      // Para GET, a lógica original é mantida, pois qualquer um pode ver um anúncio.
      try {
        const ad = await Ad.findById(id)
        if (!ad) {
          return res.status(404).json({ message: 'Anúncio não encontrado.' })
        }
        return res.status(200).json(ad)
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar anúncio.', error })
      }
    }
    case 'PUT': {
      try {
        // Adicionamos `userId: loggedInUserId` à query de busca.
        // O Mongoose só encontrará e atualizará o documento se o ID E o userId baterem.
        const updatedAd = await Ad.findOneAndUpdate(
          { _id: id, userId: loggedInUserId }, // Condição de busca atômica
          req.body, // Dados para atualizar
          { new: true, runValidators: true }
        )

        // Se `updatedAd` for null, significa que ou o anúncio não existe, ou o usuário não é o dono.
        // Em ambos os casos, a permissão é negada.
        if (!updatedAd) {
          return res.status(403).json({ message: 'Acesso negado ou anúncio não encontrado.' })
        }

        return res.status(200).json(updatedAd)
      } catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
          return res.status(400).json({ message: 'Dados inválidos.', error })
        }
        return res.status(500).json({ message: 'Falha ao atualizar anúncio', error })
      }
    }
    case 'DELETE': {
      try {
        // A mesma lógica para deletar.
        const result = await Ad.deleteOne({ _id: id, userId: loggedInUserId })

        // `deletedCount` será 0 se nenhum documento correspondeu à query.
        if (result.deletedCount === 0) {
          return res.status(403).json({ message: 'Acesso negado ou anúncio não encontrado.' })
        }

        return res.status(204).end()
      } catch (error) {
        return res.status(500).json({ message: 'Falha ao deletar anúncio', error })
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Método ${req.method} não permitido`)
      break
  }
}

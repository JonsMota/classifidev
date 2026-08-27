import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongoose'
import Ad from '@/models/Ad'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const { id } = req.query // No Pages Router, o id vem do objeto query

  switch (req.method) {
    case 'GET':
      try {
        const ad = await Ad.findById(id)
        if (!ad) return res.status(404).json({ message: 'Anúncio não encontrado' })
        res.status(200).json(ad)
      } catch (error) {
        res.status(500).json({ message: 'Falha ao buscar anúncio', error })
      }
      break

    case 'PUT':
      try {
        const updatedAd = await Ad.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!updatedAd) return res.status(404).json({ message: 'Anúncio não encontrado' })
        res.status(200).json(updatedAd)
      } catch (error) {
        res.status(500).json({ message: 'Falha ao atualizar anúncio', error })
      }
      break

    case 'DELETE':
      try {
        const deletedAd = await Ad.findByIdAndDelete(id)
        if (!deletedAd) return res.status(404).json({ message: 'Anúncio não encontrado' })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ message: 'Falha ao deletar anúncio', error })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Método ${req.method} não permitido`)
      break
  }
}
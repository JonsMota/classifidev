import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongoose'
import Ad from '@/models/Ad'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect() // Garante a conexão com o banco

  switch (req.method) {
    case 'GET':
      try {
        const ads = await Ad.find({}).sort({ date: -1 }) // Busca todos e ordena pelos mais recentes
        res.status(200).json(ads)
      } catch (error) {
        res.status(500).json({ message: 'Falha ao buscar anúncios', error })
      }
      break

    case 'POST':
      try {
        const newAd = await Ad.create(req.body) // Cria um novo anúncio com os dados do corpo da requisição
        res.status(201).json(newAd)
      } catch (error) {
        res.status(500).json({ message: 'Falha ao criar anúncio', error })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Método ${req.method} não permitido`)
      break
  }
}

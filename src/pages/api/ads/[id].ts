import type { NextApiRequest, NextApiResponse } from 'next'
import falseClassified from '@/data/constants/falseClassified'
import InterfaceClassified from '@/logic/core/Transaction'

// Como estamos usando uma variável em memória, ela é reiniciada a cada requisição no ambiente de desenvolvimento.
const ads: InterfaceClassified[] = falseClassified

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Pegamos o ID que vem na URL.
  const { id } = req.query

  const adIndex = ads.findIndex((ad) => ad.id === id)

  if (adIndex === -1) {
    return res.status(404).json({ message: 'Anúncio não encontrado.' })
  }

  switch (req.method) {
    case 'GET': {
      // Retorna o anúncio específico encontrado pelo ID.
      res.status(200).json(ads[adIndex])
      break
    }
    case 'PUT': {
      // Atualiza o anúncio com os novos dados recebidos no corpo da requisição.
      const updatedAdData = req.body
      ads[adIndex] = { ...ads[adIndex], ...updatedAdData, id: id as string }
      res.status(200).json(ads[adIndex])
      break
    }
    case 'DELETE': {
      // Remove o anúncio do array.
      ads.splice(adIndex, 1)
      res.status(204).end() // Retorna sucesso, mas sem conteúdo no corpo.
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

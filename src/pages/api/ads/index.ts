import type { NextApiRequest, NextApiResponse } from 'next'
import falseClassified from '@/data/constants/falseClassified' // Usamos os dados iniciais
import Id from '@/logic/core/common/Id'
import InterfaceClassified from '@/logic/core/Transaction'

// Por enquanto, é uma variável em memória que começa com nossos dados mockados para que o array possa ser modificado.
const ads: InterfaceClassified[] = falseClassified

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Usamos um switch para tratar cada verbo HTTP de forma mais organizada.
  switch (req.method) {
    case 'GET':
      // Se a requisição for GET, retornamos a lista completa de anúncios.
      res.status(200).json(ads)
      break
    case 'POST': {
      // Se for POST, estamos criando um novo anúncio.
      const newAdData = req.body
      const newAd: InterfaceClassified = {
        ...newAdData,
        id: Id.new(), // Geramos um novo ID para o anúncio
        date: new Date().toISOString() // Usamos toISOString para consistência e padronização
      }
      ads.push(newAd) // Adicionamos o novo anúncio ao nosso "banco de dados" em memória
      res.status(201).json(newAd) // Retornamos o anúncio criado com o status 201 (Created)
      break
    }
    default:
      // Se o método não for GET ou POST, informamos que não é permitido.
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

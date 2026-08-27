import { createContext, useState, ReactNode, useEffect, useCallback } from 'react'
import InterfaceClassified from '@/logic/core/Transaction'

// CORREÇÃO: Definimos um tipo específico para a resposta da API.
// Ele tem todos os campos de InterfaceClassified, exceto 'id', e adiciona '_id'.
type ApiAd = Omit<InterfaceClassified, 'id'> & { _id: string }

interface AdContextProps {
  ads: InterfaceClassified[]
  addAd: (ad: Omit<InterfaceClassified, 'id' | 'date'>) => Promise<void>
  updateAd: (ad: InterfaceClassified) => Promise<void>
  deleteAd: (id: string) => Promise<void>
}

const AdContext = createContext<AdContextProps>({} as AdContextProps)

export function AdProvider({ children }: { children: ReactNode }) {
  const [ads, setAds] = useState<InterfaceClassified[]>([])

  const fetchAds = useCallback(async () => {
    try {
      const resp = await fetch('/api/ads')
      // CORREÇÃO: Tipamos a constante 'data' com nosso novo tipo.
      const data: ApiAd[] = await resp.json()
      // Mapeia a resposta da API para o formato que o frontend espera
      // CORREÇÃO: O tipo de 'ad' agora é inferido corretamente, sem precisar de 'any'.
      const formattedData = data.map((ad) => ({
        ...ad,
        id: ad._id.toString() // Converte o _id do MongoDB para id
      }))
      setAds(formattedData)
    } catch (error) {
      console.error('Falha ao buscar anúncios:', error)
    }
  }, [])

  useEffect(() => {
    fetchAds()
  }, [fetchAds])

  async function addAd(newAd: Omit<InterfaceClassified, 'id' | 'date'>) {
    try {
      await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd)
      })
      await fetchAds() // Recarrega os dados para refletir a adição
    } catch (error) {
      console.error(error)
    }
  }

  async function updateAd(updatedAd: InterfaceClassified) {
    try {
      // Ao enviar para a API, não precisamos do campo 'id' no corpo,
      // pois ele já está na URL.
      const { id, ...adData } = updatedAd
      await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adData)
      })
      await fetchAds() // Recarrega os dados para refletir a atualização
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteAd(id: string) {
    try {
      await fetch(`/api/ads/${id}`, {
        method: 'DELETE'
      })
      await fetchAds() // Recarrega os dados para refletir a exclusão
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AdContext.Provider value={{ ads, addAd, updateAd, deleteAd }}>{children}</AdContext.Provider>
  )
}

export default AdContext

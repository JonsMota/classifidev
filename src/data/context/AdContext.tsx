// ATUALIZAÇÃO: Importar useEffect e useCallback para controle de efeitos e performance
import { createContext, useState, ReactNode, useEffect, useCallback } from 'react'
import InterfaceClassified from '@/logic/core/Transaction'
// REMOÇÃO: Não precisamos mais dos dados falsos aqui, a API é a fonte da verdade.
// import falseClassified from '@/data/constants/falseClassified'

interface AdContextProps {
  ads: InterfaceClassified[]
  addAd: (ad: Omit<InterfaceClassified, 'id' | 'date'>) => Promise<void>
  updateAd: (ad: InterfaceClassified) => Promise<void>
  deleteAd: (id: string) => Promise<void>
}

const AdContext = createContext<AdContextProps>({} as AdContextProps)

export function AdProvider({ children }: { children: ReactNode }) {
  // O estado agora começa vazio. Ele será preenchido pela API.
  const [ads, setAds] = useState<InterfaceClassified[]>([])

  // Função para buscar todos os anúncios da API.
  // Usamos useCallback para otimizar, evitando que a função seja recriada a cada renderização.
  const fetchAds = useCallback(async () => {
    try {
      const resp = await fetch('/api/ads')
      if (!resp.ok) throw new Error('Falha ao buscar dados')
      const adsData = await resp.json()
      setAds(adsData)
    } catch (error) {
      console.error('Falha ao buscar anúncios:', error)
    }
  }, [])

  // useEffect para carregar os anúncios assim que o componente for montado.
  // O array de dependências [fetchAds] garante que isso rode apenas uma vez.
  useEffect(() => {
    fetchAds()
  }, [fetchAds])

  // Função para ADICIONAR um anúncio via API
  async function addAd(newAd: Omit<InterfaceClassified, 'id' | 'date'>) {
    try {
      const resp = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd)
      })

      if (!resp.ok) throw new Error('Falha ao criar anúncio')
      // Após criar, buscamos a lista atualizada para refletir a mudança.
      await fetchAds()
    } catch (error) {
      console.error(error)
    }
  }

  // Função para ATUALIZAR um anúncio via API
  async function updateAd(updatedAd: InterfaceClassified) {
    try {
      const resp = await fetch(`/api/ads/${updatedAd.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAd)
      })

      if (!resp.ok) throw new Error('Falha ao atualizar anúncio')
      await fetchAds()
    } catch (error) {
      console.error(error)
    }
  }

  // Função para DELETAR um anúncio via API
  async function deleteAd(id: string) {
    try {
      const resp = await fetch(`/api/ads/${id}`, {
        method: 'DELETE'
      })

      if (!resp.ok) throw new Error('Falha ao deletar anúncio')
      await fetchAds()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AdContext.Provider value={{ ads, addAd, updateAd, deleteAd }}>{children}</AdContext.Provider>
  )
}

export default AdContext

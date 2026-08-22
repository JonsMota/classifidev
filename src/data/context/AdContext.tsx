import { createContext, useState, ReactNode } from 'react'
import InterfaceClassified from '@/logic/core/Transaction'
import falseClassified from '@/data/constants/falseClassified'
import Id from '@/logic/core/common/Id'

// 1. Definimos a "forma" do nosso contexto: uma lista de anúncios e uma função para adicionar um novo.
interface AdContextProps {
  ads: InterfaceClassified[]
  addAd: (ad: Omit<InterfaceClassified, 'id' | 'date'>) => void
  updateAd: (ad: InterfaceClassified) => void // Adicionada função de atualizar
  deleteAd: (id: string) => void // Adicionada função de deletar
}

const AdContext = createContext<AdContextProps>({} as AdContextProps)

export function AdProvider({ children }: { children: ReactNode }) {
  const [ads, setAds] = useState<InterfaceClassified[]>(falseClassified)
  function addAd(newAd: Omit<InterfaceClassified, 'id' | 'date'>) {
    const adWithIdAndDate: InterfaceClassified = {
      ...newAd,
      id: Id.new(), 
      date: new Date() 
    }
    setAds([...ads, adWithIdAndDate])
  }
  
  // 2. NOVO: Função para atualizar um anúncio existente
  function updateAd(updatedAd: InterfaceClassified) {
    const newAds = ads.map((ad) => {
      if (ad.id === updatedAd.id) {
        return updatedAd // Se encontrou o id, retorna o anúncio modificado
      } else {
        return ad // Senão, retorna o anúncio como estava
      }
    })
    setAds(newAds)
  }

  // 3. NOVO: Função para deletar um anúncio
  function deleteAd(id: string) {
    const newAds = ads.filter((ad) => ad.id !== id) // Mantém todos os anúncios cujo id é diferente
    setAds(newAds)
  }

  // 4. ATUALIZAÇÃO: Disponibilizar as novas funções no provedor
  return (
    <AdContext.Provider value={{ ads, addAd, updateAd, deleteAd }}>{children}</AdContext.Provider>
  )
}

export default AdContext
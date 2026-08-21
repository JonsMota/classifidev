import { createContext, useState, ReactNode } from 'react'
import InterfaceClassified from '@/logic/core/Transaction'
import falseClassified from '@/data/constants/falseClassified'
import Id from '@/logic/core/common/Id'

// 1. Definimos a "forma" do nosso contexto: uma lista de anúncios e uma função para adicionar um novo.
interface AdContextProps {
  ads: InterfaceClassified[]
  addAd: (ad: Omit<InterfaceClassified, 'id' | 'date'>) => void
}

// 2. Criamos o contexto com um valor inicial vazio.
const AdContext = createContext<AdContextProps>({} as AdContextProps)

// 3. Criamos o "Provedor" (Provider). Este componente vai "abraçar" nossa aplicação.
export function AdProvider({ children }: { children: ReactNode }) {
  // O estado com a lista de anúncios começa com nossos dados falsos.
  const [ads, setAds] = useState<InterfaceClassified[]>(falseClassified)

  // Esta é a função que o formulário vai chamar.
  function addAd(newAd: Omit<InterfaceClassified, 'id' | 'date'>) {
    const adWithIdAndDate: InterfaceClassified = {
      ...newAd,
      id: Id.new(), // Gera um novo ID único
      date: new Date() // Define a data de criação como agora
    }
    // Atualizamos o estado, adicionando o novo anúncio à lista existente.
    setAds([...ads, adWithIdAndDate])
  }

  // O Provedor disponibiliza a lista `ads` e a função `addAd` para todos os seus filhos.
  return <AdContext.Provider value={{ ads, addAd }}>{children}</AdContext.Provider>
}

export default AdContext
import { createContext, useState, ReactNode, useEffect, useCallback } from 'react'
import InterfaceClassified from '@/logic/core/Transaction'

// A API retorna _id e userId. Nosso frontend usa id.
type ApiAd = Omit<InterfaceClassified, 'id'> & { _id: string; userId: string }

// Interface para as informações do usuário que virão da API.
interface UserInfo {
  firstName: string
}

interface AdContextProps {
  ads: InterfaceClassified[]
  loggedInUserId: string | null
  userInfo: UserInfo | null // Informações do usuário
  addAd: (ad: Omit<InterfaceClassified, 'id' | 'date' | 'userId'>) => Promise<void>
  updateAd: (ad: InterfaceClassified) => Promise<void>
  deleteAd: (id: string) => Promise<void>
  logout: () => Promise<void> // função de logout.
  fetchAds: () => Promise<void>
}

const AdContext = createContext<AdContextProps>({} as AdContextProps)

export function AdProvider({ children }: { children: ReactNode }) {
  const [ads, setAds] = useState<InterfaceClassified[]>([])
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null) // Novo estado.

  const fetchAds = useCallback(async () => {
    try {
      const resp = await fetch('/api/ads')
      if (!resp.ok) throw new Error('Falha ao buscar dados da API')
      
      // A API agora retorna userInfo junto com ads e userId	
      const data: { 
        ads: ApiAd[] 
        userId: string | null 
        userInfo: UserInfo | null
      } = await resp.json()

      // Mapeamos a lista de anúncios que está dentro do objeto `data
     const formattedData = data.ads.map((ad) => ({
        ...ad,
        id: ad._id.toString(), // Converte o _id do MongoDB para id
        userId: ad.userId // Garantimos que o userId está no objeto formatado
      }))

      setAds(formattedData)
      setLoggedInUserId(data.userId) // Armazenamos o ID do usuário logado
      setUserInfo(data.userInfo) // Armazena as informações do usuário.
    } catch (error) {
      console.error('Falha ao buscar anúncios:', error)
      setAds([])  // Em caso de erro, garante que a lista fique vazia
      setLoggedInUserId(null) // Limpeza de segurança.
      setUserInfo(null) 
    }
  }, [])
  // Função de logout criada
  const logout = useCallback(async () => { 
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      })
      await fetchAds()
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }, [fetchAds])

  useEffect(() => {
    fetchAds()
  }, [fetchAds])

  async function addAd(newAd: Omit<InterfaceClassified, 'id' | 'date' | 'userId'>) {
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
    <AdContext.Provider value={{ 
      ads, 
      loggedInUserId, 
      userInfo, // Disponibiliza userInfo.
      addAd, 
      updateAd, 
      deleteAd, 
      logout,   // Disponibiliza logout.
      fetchAds }}>
      {children}
    </AdContext.Provider>
  )
}

export default AdContext

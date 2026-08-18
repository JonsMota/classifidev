import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import falseClassified from '@/data/constants/falseClassified'
import Data from '@/logic/core/utils/Data'
import Dinheiro from '@/logic/core/utils/Dinheiro'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import AdCardContainer from '@/components/landing/adCard/AdCardContainer'
import InterfaceClassified from '@/logic/core/Transaction'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
`

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
`

const categoryImages: { [key: string]: string } = {
  Automóveis: '/categories/automoveis.svg',
  Informática: '/categories/informatica.svg',
  'Roupas & Acessórios': '/categories/roupas_acessorios.svg'
}

export default function AdPage() {
  const router = useRouter()
  const { id } = router.query

  // Use o tipo InterfaceClassified diretamente, que já representa os dados.
  const [ad, setAd] = useState<InterfaceClassified | null>(null)

  useEffect(() => {
    if (typeof id === 'string') {
      const foundAd = falseClassified.find((item) => item.id === id)
      // Se foundAd for undefined, setAd(null) será chamado implicitamente.
      setAd(foundAd || null)
    }
  }, [id])

  return (
    <PageContainer>
      <Header showMenu={false} />
      <ContentContainer>
        {ad ? (
          <ItemContainer>
            <AdCardContainer>
              <h2>{ad.name}</h2>
              <CategoryContainer>
                <img src={categoryImages[ad.category]} alt={ad.category} />
                <p>{ad.category}</p>
              </CategoryContainer>
              {/* A data nos dados é uma string, então new Date() é necessário */}
              <p>Postado em {Data.ddmmyy.formatar(new Date(ad.date))}</p>
              <p>{Dinheiro.formatar(ad.price)}</p>
              <p>{ad.description}</p>
            </AdCardContainer>
          </ItemContainer>
        ) : (
          <p>Anúncio não encontrado ou carregando...</p>
        )}
      </ContentContainer>
      <Footer />
    </PageContainer>
  )
}

import styled from 'styled-components'
import { useRouter } from 'next/router'
// 1. Importar useContext junto com useEffect e useState
import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'

import Data from '@/logic/core/utils/Data'
import Dinheiro from '@/logic/core/utils/Dinheiro'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
// 2. Importar a classe Mask e o AdContext
import Mask from '@/logic/core/utils/Mask'
import AdContext from '@/data/context/AdContext'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.detailPageBackground}; 
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  color: ${(props) => props.theme.white};
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`

const BackLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: underline;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  gap: 10px;
  margin-bottom: 2rem;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  gap: 1.5rem;
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
`

const EditDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

// Usamos o prefixo $ para criar uma "Transient Prop" no styled-components
const EditDeleteButton = styled.div<{ $isDelete?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  text-decoration: underline;
  color: ${(props) => (props.$isDelete ? props.theme.deleteButtonText : props.theme.white)};
`

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 4px;
  p {
    font-weight: 700;
    font-size: 14px;
  }

  img {
    filter: invert(1);
  }
`

const PostDate = styled.p`
  color: ${(props) => props.theme.postDateText};
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
`

const Price = styled.p`
  color: ${(props) => props.theme.priceText};
  font-size: 20px;
  font-weight: 700;
  margin: 16px 0;
`

const Description = styled.p`
  color: ${(props) => props.theme.white};
  line-height: 1.6;
`

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
`

const ContactTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 16px;
`

const categoryImages: { [key: string]: string } = {
  Automóveis: '/categories/automoveis.svg',
  Informática: '/categories/informatica.svg',
  'Roupas & Acessórios': '/categories/roupas_acessorios.svg',
  Carros: '/categories/automoveis.svg'
}

export default function AdDetail() {
  const router = useRouter()
  const { id } = router.query
  const [ad, setAd] = useState<any>(null)

  // 3. Pegar a lista de anúncios (ads) do Contexto
  const { ads } = useContext(AdContext)

  useEffect(() => {
    // 4. Garante que a busca só ocorra se 'id' e 'ads' existirem
    if (id && ads.length > 0) {
      const foundAd = ads.find((item) => item.id === String(id))
      setAd(foundAd)
    }
  }, [id, ads]) // 5. Adicione 'ads' na lista de dependências

  if (!ad) {
    return <p>Carregando...</p>
  }

  return (
    <PageContainer>
      <Header showMenu={false} />
      <ContentContainer>
        <BackLink onClick={() => router.push('/')}>
          <Image src="/icons/Flecha_esquerda.svg" alt="Voltar" width="24" height="24" />
          Voltar para a página inicial
        </BackLink>

        <TitleContainer>
          <Title>{ad.name}</Title>
          <EditDeleteContainer>
            <EditDeleteButton
              onClick={() => console.log('ação de editar o anúncio no futuro:', ad.id)}
            >
              <Image src="/icons/Edit.svg" alt="Editar" width="24" height="24" />
              Editar
            </EditDeleteButton>
            <EditDeleteButton
              $isDelete={true}
              onClick={() => console.log('ação de deletar o anúncio no futuro:', ad.id)}
            >
              <Image src="/icons/Delete.svg" alt="Deletar" width="24" height="24" />
              Deletar
            </EditDeleteButton>
          </EditDeleteContainer>
        </TitleContainer>

        <CategoryContainer>
          <Image src={categoryImages[ad.category]} alt={ad.category} width="24" height="24" />
          <p>{ad.category}</p>
        </CategoryContainer>

        <PostDate>Postado em {Data.ddmmyy.formatar(new Date(ad.date))}</PostDate>

        <Price>{Dinheiro.formatar(ad.price)}</Price>

        <Description>{ad.description}</Description>

        <ContactContainer>
          <ContactTitle>Gostou? Entre em contato</ContactTitle>
          <ContactInfo>
            <Image src="/icons/Call.svg" alt="Contato" width="31" height="31" />
            {/* 6. Usar o valor de ad.whatsapp e formatá-lo dinamicamente */}
            <p>{Mask.phone(String(ad.whatsapp))}</p>
          </ContactInfo>
        </ContactContainer>
      </ContentContainer>
      <Footer />
    </PageContainer>
  )
}
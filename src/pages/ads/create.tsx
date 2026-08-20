import Page from '@/components/template/Page'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import AdForm from '@/components/landing/form/AdForm'
import styled from 'styled-components'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: ${(props) => props.theme.white};
  padding: 2rem 1rem; // Adiciona um espaçamento
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

export default function CreateAdPage() {
  return (
    <Page>
      {/* Passamos showMenu={false} para não mostrar o botão "Criar anúncio" nesta página */}
      <Header showMenu={false} />
      <FormContainer>
        <Title>Crie seu anúncio</Title>
        {/* Agora o AdForm é renderizado aqui */}
        <AdForm />
      </FormContainer>
      <Footer />
    </Page>
  )
}

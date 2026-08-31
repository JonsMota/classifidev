import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import AdContext from '@/data/context/AdContext'

import Page from '@/components/template/Page'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginSchema } from '@/logic/core/schemas/loginSchema'

// Tipagem para os dados do formulário de login
type LoginFormInputs = {
  identifier: string
  password: string
}

// --- Componentes Estilizados (reutilizados de register.tsx) ---
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: ${(props) => props.theme.white};
  padding: 2rem 1rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`

const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.formInputBackground};
  color: ${(props) => props.theme.formInputText};
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  &::placeholder {
    color: ${(props) => props.theme.formInputText};
  }
  &:focus {
    outline: 2px solid ${(props) => props.theme.button};
  }
`

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.button};
  color: ${(props) => props.theme.white};
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.span};
  font-size: 0.875rem;
  margin-top: -0.5rem;
  text-align: left;
`

const ApiErrorMessage = styled(ErrorMessage)`
  text-align: center;
  margin-top: 1rem;
`

const RegisterLink = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.linkText};
  a {
    color: ${(props) => props.theme.button};
    text-decoration: underline;
    cursor: pointer;
  }
`

// --- Componente da Página de Login ---
export default function LoginPage() {
  const router = useRouter()
  const [apiError, setApiError] = useState('')
  const { fetchAds } = useContext(AdContext) // Obter a função fetchAds do contexto

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: joiResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setApiError('')
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      // Atualiza o estado global ANTES de navegar
      await fetchAds()
      router.push('/')
    } else {
      const errorData = await response.json()
      setApiError(errorData.message || 'Ocorreu um erro no login.')
    }
  }

  return (
    <Page>
      <Header showMenu={false} />
      <FormContainer>
        <Title>Faça seu Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Email ou Nome de Usuário" {...register('identifier')} />
          {errors.identifier && <ErrorMessage>{errors.identifier.message}</ErrorMessage>}

          <Input type="password" placeholder="Senha" {...register('password')} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <SubmitButton type="submit">Entrar</SubmitButton>
          {apiError && <ApiErrorMessage>{apiError}</ApiErrorMessage>}
        </Form>
        <RegisterLink>
          Não tem uma conta? <Link href="/register">Cadastre-se</Link>
        </RegisterLink>
      </FormContainer>
      <Footer />
    </Page>
  )
}

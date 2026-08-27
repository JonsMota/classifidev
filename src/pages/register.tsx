import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Page from '@/components/template/Page'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import Link from 'next/link'

import { useForm, SubmitHandler } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { userSchema } from '@/logic/core/schemas/userSchema'
import { User } from '@/logic/core/interfaces/User'

// Estilos para o formulário (reutilizados para consistência visual)
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
  text-align: left;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`

const LoginLink = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.linkText};
  a {
    color: ${(props) => props.theme.button};
    text-decoration: underline;
    cursor: pointer;
  }
`

// Componente da página de cadastro
export default function RegisterPage() {
  const router = useRouter()
  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    resolver: joiResolver(userSchema)
  })

  const onSubmit: SubmitHandler<User> = async (data) => {
    setApiError('')

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      router.push('/login')
    } else {
      const errorData = await response.json()
      setApiError(errorData.message || 'Ocorreu um erro no cadastro.')
    }
  }

  return (
    <Page>
      <Header showMenu={false} /> {/* Esconde o menu principal nesta página */}
      <FormContainer>
        <Title>Crie sua Conta</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Primeiro Nome" {...register('firstName')} />
          {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}

          <Input type="text" placeholder="Sobrenome" {...register('lastName')} />
          {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}

          <Input type="text" placeholder="Nome de Usuário" {...register('user')} />
          {errors.user && <ErrorMessage>{errors.user.message}</ErrorMessage>}

          <Input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input type="password" placeholder="Senha" {...register('password')} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <SubmitButton type="submit">Cadastrar</SubmitButton>
          {apiError && <ErrorMessage style={{ textAlign: 'center' }}>{apiError}</ErrorMessage>}
        </Form>
        <LoginLink>
          Já tem uma conta? <Link href="/login">Faça login</Link>
        </LoginLink>
      </FormContainer>
      <Footer />
    </Page>
  )
}

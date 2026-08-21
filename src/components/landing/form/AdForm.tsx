import styled, { css, DefaultTheme } from 'styled-components'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import InterfaceClassified from '@/logic/core/Transaction'
import { adSchema } from '@/logic/core/schemas/adSchema'
import AdContext from '@/data/context/AdContext'
import Mask from '@/logic/core/utils/Mask'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`

// Interface para tipar as props dos componentes estilizados
// Isso é crucial para evitar erros de "implicit any" no TypeScript.
interface StyledComponentProps {
  theme: DefaultTheme
}

// Usamos o helper `css` para criar um bloco de estilos reutilizável.
// A tipagem <StyledComponentProps> permite que o TypeScript entenda `props.theme`.
const commonInputStyles = css<StyledComponentProps>`
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

// Aplicamos os estilos comuns aos componentes de input, select e textarea.
const Input = styled.input<StyledComponentProps>`
  ${commonInputStyles}
`

const Select = styled.select<StyledComponentProps>`
  ${commonInputStyles}
  appearance: none;
  background-image: url('/icons/Seletor.svg');
  background-repeat: no-repeat;
  background-position: right 1rem center;
`

const TextArea = styled.textarea<StyledComponentProps>`
  ${commonInputStyles}
  min-height: 120px;
  resize: vertical;
`

const SubmitButton = styled.button<StyledComponentProps>`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.button};
  color: ${(props) => props.theme.white};
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const ErrorMessage = styled.p<StyledComponentProps>`
  color: ${(props) => props.theme.span};
  font-size: 0.875rem;
  margin-top: -0.5rem; /* Puxa a mensagem para mais perto do campo */
`

// --- Lógica do Componente ---
const categories = ['Automóveis', 'Informática', 'Roupas & Acessórios']

// Tipagem para os dados do formulário, para garantir consistência
type FormData = {
  name: string
  category: string
  price: string
  whatsapp: string
  description: string
}

export default function AdForm() {
  // useForm gerencia todo o estado e validação do formulário
  const { addAd } = useContext(AdContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: joiResolver(adSchema), // Conecta o Joi para validação
    defaultValues: {
      // Inicia os valores para o react-hook-form
      name: '',
      category: '',
      price: '',
      whatsapp: '',
      description: ''
    }
  })

  // Esta função só é chamada se a validação do formulário passar
  const onSubmit = (data: FormData) => {
    // Remover a máscara antes de enviar os dados (lógica movida para cá)
    const unmaskedPrice = Mask.unmask(data.price)
    const unmaskedWhatsapp = Mask.unmask(data.whatsapp)

    // Monta o objeto com todos os dados do formulário já validados
    const adData: Omit<InterfaceClassified, 'id' | 'date'> = {
      name: data.name,
      category: data.category,
      price: parseFloat(unmaskedPrice) / 100,
      whatsapp: parseInt(unmaskedWhatsapp, 10),
      description: data.description
    }
    // Executa a função do Contexto para salvar o novo anúncio
    addAd(adData) 
    
    // Redireciona o usuário para a página inicial (Home)
    router.push('/') 
  }

  return (
    // `handleSubmit do react-hook-form gerencia o `e.preventDefault()` e a validação
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" placeholder="Nome do produto" {...register('name')} />
      {/* Exibe a mensagem de erro se a validação do campo 'name' falhar */}
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

      <Select {...register('category')}>
        <option value="" disabled>
          Selecione a categoria
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}

      <Input
        type="text"
        placeholder="Preço"
        {...register('price')}
        // onChange agora usa `setValue` para funcionar com a máscara e o react-hook-form
        onChange={(e) => setValue('price', Mask.currency(e.target.value), { shouldValidate: true })}
      />
      {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}

      <Input
        type="text"
        placeholder="Whatsapp"
        maxLength={15}
        {...register('whatsapp')}
        // onChange também usa `setValue` para a máscara de telefone
        onChange={(e) => setValue('whatsapp', Mask.phone(e.target.value), { shouldValidate: true })}
      />
      {errors.whatsapp && <ErrorMessage>{errors.whatsapp.message}</ErrorMessage>}

      <TextArea placeholder="Descrição" {...register('description')} />
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

      <SubmitButton type="submit">Criar anúncio</SubmitButton>
    </Form>
  )
}

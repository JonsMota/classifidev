import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled, { css, DefaultTheme } from 'styled-components'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'

import InterfaceClassified from '@/logic/core/Transaction'
import AdContext from '@/data/context/AdContext'
import Mask from '@/logic/core/utils/Mask'
import { adSchema } from '@/logic/core/schemas/adSchema'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`

interface StyledComponentProps {
  theme: DefaultTheme
}

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
  margin-top: -0.5rem;
`

const categories = ['Automóveis', 'Informática', 'Roupas & Acessórios']

type FormData = {
  name: string
  category: string
  price: string
  whatsapp: string
  description: string
}

// ALTERAÇÃO: O componente agora aceita o ID vindo da página para saber se é edição
export default function AdForm({ id }: { id?: string }) {
  // ALTERAÇÃO: Trazendo a lista (ads) e a função de atualizar (updateAd) do contexto
  const { ads, addAd, updateAd } = useContext(AdContext)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset // Importamos o `reset` para preencher o formulário
  } = useForm<FormData>({
    resolver: joiResolver(adSchema)
  })

  // `useEffect` para preencher o formulário no modo de edição
  useEffect(() => {
    if (id && ads.length > 0) {
      const adToEdit = ads.find((ad) => ad.id === id)
      if (adToEdit) {
        // Usamos `reset` para preencher todos os campos de uma vez com os dados antigos
        reset({
          name: adToEdit.name,
          category: adToEdit.category,
          price: Mask.currency(adToEdit.price * 100),
          whatsapp: Mask.phone(String(adToEdit.whatsapp)),
          description: adToEdit.description
        })
      }
    }
  }, [id, ads, reset]) // Adicionamos `reset` às dependências

  // A função de submissão agora recebe os dados validados pelo `react-hook-form`
  const onSubmit = (data: FormData) => {
    const unmaskedPrice = Mask.unmask(data.price)
    const unmaskedWhatsapp = Mask.unmask(data.whatsapp)

    if (id) {
      // Modo de Edição, Adicionado 'userId'
      const updatedAdData: Omit<InterfaceClassified, 'userId'> = {
        id,
        name: data.name,
        category: data.category,
        price: parseFloat(unmaskedPrice) / 100,
        whatsapp: parseInt(unmaskedWhatsapp, 10),
        description: data.description,
        date: new Date() // Atualiza a data da modificação
      }
      updateAd(updatedAdData as InterfaceClassified)
    } else {
      // Modo de Criação, Adicionado 'userId' ao Omit
      const newAdData: Omit<InterfaceClassified, 'id' | 'date' | 'userId'> = {
        name: data.name,
        category: data.category,
        price: parseFloat(unmaskedPrice) / 100,
        whatsapp: parseInt(unmaskedWhatsapp, 10),
        description: data.description
      }
      addAd(newAdData)
    }

    router.push('/')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" placeholder="Nome do produto" {...register('name')} />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

      <Select {...register('category')} defaultValue="">
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
        onChange={(e) => setValue('price', Mask.currency(e.target.value), { shouldValidate: true })}
      />
      {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}

      <Input
        type="text"
        placeholder="Whatsapp"
        maxLength={15}
        {...register('whatsapp')}
        onChange={(e) => setValue('whatsapp', Mask.phone(e.target.value), { shouldValidate: true })}
      />
      {errors.whatsapp && <ErrorMessage>{errors.whatsapp.message}</ErrorMessage>}

      <TextArea placeholder="Descrição" {...register('description')} />
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      {/* ALTERAÇÃO: O texto do botão muda se estivermos editando */}
      <SubmitButton type="submit">{id ? 'Salvar Alterações' : 'Criar anúncio'}</SubmitButton>
    </Form>
  )
}

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdForm from '@/components/landing/form/AdForm'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import AdContext from '@/data/context/AdContext'

// 1. Mock do useRouter
const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

// 2. Mock das funções do Contexto
const mockAddAd = jest.fn()
const mockUpdateAd = jest.fn()

// Helper de renderização
const renderAdForm = (props = {}) => {
  return render(
    <AdContext.Provider
      value={{
        ads: [], // Estado inicial vazio para o teste
        addAd: mockAddAd,
        updateAd: mockUpdateAd,
        deleteAd: jest.fn(),
        fetchAds: jest.fn(),
        logout: jest.fn(),
        loggedInUserId: '123',
        userInfo: { firstName: 'Tester' }
      }}
    >
      <ThemeProvider theme={theme}>
        <AdForm {...props} />
      </ThemeProvider>
    </AdContext.Provider>
  )
}

describe('Integração AdForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Teste 1: Validação
  it('deve mostrar erros de validação se tentar enviar vazio', async () => {
    const user = userEvent.setup() // Setup do userEvent
    renderAdForm()

    const submitButton = screen.getByText('Criar anúncio')
    // CORREÇÃO DE PRÁTICA: Usar user.click ao invés de fireEvent.click
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('O nome do produto é obrigatório.')).toBeInTheDocument()
      expect(screen.getByText('O preço é obrigatório.')).toBeInTheDocument()
    })
  })

  // Teste 2: Caminho Feliz (Sucesso)
  it('deve chamar a função addAd quando o formulário for preenchido corretamente', async () => {
    const user = userEvent.setup()
    renderAdForm()

    await user.type(screen.getByPlaceholderText('Nome do produto'), 'Notebook Gamer')
    await user.selectOptions(screen.getByRole('combobox'), 'Informática')
    await user.type(screen.getByPlaceholderText('Preço'), '350000')
    await user.type(screen.getByPlaceholderText('Whatsapp'), '11999999999')
    await user.type(screen.getByPlaceholderText('Descrição'), 'Notebook em ótimo estado')

    const submitButton = screen.getByText('Criar anúncio')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockAddAd).toHaveBeenCalled()
      expect(mockAddAd).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Notebook Gamer',
          category: 'Informática',
          description: 'Notebook em ótimo estado'
        })
      )
    })
  })
})

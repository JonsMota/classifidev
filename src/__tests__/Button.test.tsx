import { render, screen } from '@testing-library/react'
import Button from '@/components/landing/common/Button'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'

// Helper para renderizar componentes com o Tema
const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Componente Button', () => {
  it('deve renderizar o texto corretamente', () => {
    renderWithTheme(<Button>Clique Aqui</Button>)

    const buttonElement = screen.getByText('Clique Aqui')
    expect(buttonElement).toBeInTheDocument()
  })

  it('deve renderizar um link quando a prop url for passada', () => {
    renderWithTheme(<Button url="/teste">Link Botão</Button>)

    const linkElement = screen.getByRole('link', { name: /link botão/i })

    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/teste')
  })
})

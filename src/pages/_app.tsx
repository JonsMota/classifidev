import { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { AdProvider } from '@/data/context/AdContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <AdProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AdProvider>
  )
}

export default App

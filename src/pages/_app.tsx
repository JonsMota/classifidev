import { ComponentType } from 'react'
import { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { AdProvider } from '@/data/context/AdContext'

interface MyAppProps extends AppProps {
  Component: ComponentType<any>
  pageProps: any
}

function App({ Component, pageProps }: MyAppProps) {
  return (
    <AdProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AdProvider>
  )
}

export default App

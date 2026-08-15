import { ComponentType } from 'react'
import { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

interface MyAppProps extends AppProps {
  Component: ComponentType<any>
  pageProps: any
}

function App({ Component, pageProps }: MyAppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App

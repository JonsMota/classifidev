import styled from 'styled-components'

import Button from '../common/Button'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import AdContext from '@/data/context/AdContext'

const MenuContainer = styled.div`
  display: flex;
  gap: 2.5rem;
`

const StyledButton = styled(Button)`
  display: none;
`
const AuthLink = styled.a`
  color: ${(props) => props.theme.white};
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
export default function Menu() {
  const { loggedInUserId } = useContext(AdContext) // A extração da variável loggedInUserId através do useContext(AdContext)
  const [isClient, setIsClient] = useState(false)  // Cria o estado isClient (iniciado como false)

  useEffect(() => { //muda esse estado para true assim que a tela carrega.
    setIsClient(true)
  }, [])

  // Evita inconsistência de renderização entre servidor e cliente (hydration mismatch)
  if (!isClient) {
    return null
  }

  return (
    <MenuContainer>
      {loggedInUserId ? (
        // Se logado, mostra o botão "Criar anúncio"
        <Link href="/ads/create" passHref legacyBehavior>
          <a style={{ textDecoration: 'none' }}>
            <StyledButton>Criar anúncio</StyledButton>
          </a>
        </Link>
      ) : (
        // Se não, mostra o link "Entrar"
        <Link href="/login" passHref legacyBehavior>
          <AuthLink>Entrar</AuthLink>
        </Link>
      )}
    </MenuContainer>
  )
}


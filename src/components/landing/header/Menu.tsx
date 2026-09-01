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

// NOVOS STYLED COMPONENTS ADICIONADOS AQUI
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.white};
`

const WelcomeText = styled.span`
  font-weight: 300;
  
  @media (max-width: 768px) {
    display: none; // Esconde "Olá," em telas menores para economizar espaço.
  }
`

const UserName = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.button};
`

const LogoutButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.button};
  color: ${(props) => props.theme.button};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.button};
    color: ${(props) => props.theme.white};
  }
`

export default function Menu() {
  const { loggedInUserId, userInfo, logout } = useContext(AdContext) 
  const [isClient, setIsClient] = useState(false) 

  useEffect(() => { //muda esse estado para true assim que a tela carrega.
    setIsClient(true)
  }, [])

  // Função que gerencia o clique de saída
  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      await logout()
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <MenuContainer>
      {/* Validação dupla (ID + Info do usuário) */}
      {loggedInUserId && userInfo ? (
        <>
          {/* Bloco visual de saudação com o nome do usuário */}
          <UserInfo>
            <WelcomeText>Olá,</WelcomeText>
            <UserName>{userInfo.firstName}</UserName>
          </UserInfo>
          
          <Link href="/ads/create" passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <StyledButton>Criar anúncio</StyledButton>
            </a>
          </Link>
          
          {/* Botão de saída */}
          <LogoutButton onClick={handleLogout}>
            Sair
          </LogoutButton>
        </>
      ) : (
        <Link href="/login" passHref legacyBehavior>
          <AuthLink>Entrar</AuthLink>
        </Link>
      )}
    </MenuContainer>
  )
}


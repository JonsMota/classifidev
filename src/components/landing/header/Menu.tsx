import styled from 'styled-components'

import Button from '../common/Button'
import Link from 'next/link'

const MenuContainer = styled.div`
  display: flex;
  gap: 2.5rem;
`

const StyledButton = styled(Button)`
  display: none;
`
export default function Menu() {
  return (
    <MenuContainer>
      <Link href="/ads/create" passHref legacyBehavior>
        <a style={{ textDecoration: 'none' }}>
          <StyledButton>Criar anúncio</StyledButton>
        </a>
      </Link>
    </MenuContainer>
  )
}


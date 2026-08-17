import styled from 'styled-components'

import Button from '../common/Button'

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
      <StyledButton>Criar anúncio</StyledButton>
    </MenuContainer>
  )
}


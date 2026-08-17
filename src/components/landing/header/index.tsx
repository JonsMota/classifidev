import styled from 'styled-components'

import Area from '../common/Area'
import Logo from '../common/Logo'

const HeaderConatiner = styled.div`
  background-color: ${(props) => props.theme.secondary};
`

export default function Header() {
  return (
    <HeaderConatiner>
      <Area>
        <Logo />
      </Area>
      
    </HeaderConatiner>
  )
}
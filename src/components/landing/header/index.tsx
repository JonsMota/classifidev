import styled from 'styled-components'

import Area from '../common/Area'
import Logo from '../common/Logo'
import Menu from './Menu'

const HeaderConatiner = styled.div`
  background-color: ${(props) => props.theme.secondary};
  position: relative;
  z-index: 50;
`
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 7.4rem;
`

interface HeaderProps {
  showMenu?: boolean
}

export default function Header({ showMenu = true}: HeaderProps) {
  return (
    <HeaderConatiner>
      <Area>
        <HeaderContent>
           <Logo />
           {showMenu && <Menu />}
        </HeaderContent>
      </Area>
    </HeaderConatiner>
  )
}
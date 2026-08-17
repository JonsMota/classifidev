import styled from 'styled-components'
import Link from 'next/link'

interface ButtonItemProps {
    children: React.ReactNode
    url?: string
    className?: string
}

const StyledButton = styled.div`
  background-color: ${(props) => props.theme.button};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 30px;
  color: ${(props) => props.theme.white};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin: 0.1rem;
  padding: 13px;
  font-weight: 700;
  font-size: 20px;
`

export default function Button(props: ButtonItemProps) {
    function renderButton() {
        return <StyledButton>{props.children}</StyledButton>
    }

    return props.url ? <Link href={props.url ?? ''}>{renderButton()}</Link> : renderButton()
}

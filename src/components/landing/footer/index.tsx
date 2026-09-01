import styled from 'styled-components'

import Area from '../common/Area'

const StyledFooter = styled.div`
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: auto;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 60%;
  margin: auto;
  margin-top: 16px;
`
const StyledText = styled.h3`
  color: ${(props) => props.theme.white};
  font-weight: 300;
  font-style: italic;
  font-size: 20px;
`
const Span = styled.span`
  color: ${(props) => props.theme.span};
  font-weight: 700;
`

export default function Footer() {
  return (
    <StyledFooter>
      <Area>
        <StyledContent>
          <StyledText>
            Criado por <Span>J</Span>onas <Span>M</Span>ota ® {new Date().getFullYear()}
          </StyledText>
        </StyledContent>
      </Area>
    </StyledFooter>
  )
}

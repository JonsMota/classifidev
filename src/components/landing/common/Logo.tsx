import styled from 'styled-components'

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
  cursor: pointer;
`

const Title = styled.h2`
  color: ${(props) => props.theme.white};
  font-weight: 700;
  font-size: 36px;
`

const StyledSubTitle = styled.h3`
  color: ${(props) => props.theme.subTitle};
  font-weight: 100;
  font-style: italic;
  font-size: 20px;
  margin-top: -30px;
`

export default function Logo() {
  return (
    <StyledLogo>
      <Title>ClassifiDev</Title>
      <StyledSubTitle>O seu classificado online</StyledSubTitle>
    </StyledLogo>
  )
}

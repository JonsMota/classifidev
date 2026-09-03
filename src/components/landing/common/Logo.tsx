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

  @media (max-width: 640px) {
    font-size: 28px;
  }

  @media (max-width: 320px) {
    font-size: 24px;
  }
`

const StyledSubTitle = styled.h3`
  color: ${(props) => props.theme.subTitle};
  font-weight: 100;
  font-style: italic;
  font-size: 20px;
  margin-top: -30px;

  @media (max-width: 640px) {
    font-size: 16px;
    margin-top: -24px;
  }

  @media (max-width: 320px) {
    font-size: 14px;
    margin-top: -20px;
  }
`

export default function Logo() {
  return (
    <StyledLogo>
      <Title>ClassifiDev</Title>
      <StyledSubTitle>O seu classificado online</StyledSubTitle>
    </StyledLogo>
  )
}

import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  min-height: 313px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.cardBorder};
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.cardBackground};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1220px) {
    min-height: 313px;
    padding: 20px;
  }

  @media (min-width: 1600px) {
    min-height: 420px;
    padding: 30px;
  }
`

export default function AdCardContainer({ children }: { children: React.ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>
}

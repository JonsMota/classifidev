import React from 'react'
import styled from 'styled-components'

interface AreaProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${(props) => props.className};
`

const ContentContainer = styled.div`
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  width: 100%;

  @media (min-width: 1280px) {
    padding-left: 0;
    padding-right: 0;
    width: 1200px;
  }

  @media (min-width: 1600px) {
    padding-left: 0;
    padding-right: 0;
    width: 1500px;
  }
`

const Area: React.FC<AreaProps> = ({ children, className, id }) => {
  return (
    <Container id={id} className={className}>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  )
}

export default Area

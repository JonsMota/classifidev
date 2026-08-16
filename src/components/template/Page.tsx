import styled from 'styled-components'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.primary};
`

interface PageProps {
  children: React.ReactNode
  className?: string
}

export default function Page(props: PageProps) {
  return <StyledPage className={props.className}>{props.children}</StyledPage>
}
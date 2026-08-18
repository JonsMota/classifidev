import styled from 'styled-components'

import Area from '../common/Area'
import falseClassified from '@/data/constants/falseClassified'
import {
  Name,
  PostDate,
  Price,
  Description,
  Category
} from '@/components/landing/adCard/StyledClassified'

const StyledAdCard = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Default mobile */
  gap: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-top: 100px;
    margin-bottom: 100px;
    padding: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    margin-top: 150px;
    margin-bottom: 150px;
    padding: 30px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 70px;
  }
`

export default function AdCard() {
  return (
    <Area>
      <StyledAdCard>
        {falseClassified.map((item, index) => (
          <div key={index}>
            <Name>{item.name}</Name>
            <PostDate>Postado em {new Date(item.date).toLocaleDateString()}</PostDate>
            <Price>{item.price}</Price>
            <Description>{item.description}</Description>
            <Category>{item.category}</Category>
          </div>
        ))}
      </StyledAdCard>
    </Area>
  )
}
import styled from 'styled-components'
import { useState, useContext } from 'react'
import Link from 'next/link'

import Area from '../common/Area'
import AdContext from '@/data/context/AdContext'
import {
  Name,
  PostDate,
  Price,
  Description,
  Category
} from '@/components/landing/adCard/StyledClassified'
import Data from '@/logic/core/utils/Data'
import Dinheiro from '@/logic/core/utils/Dinheiro'
import AdCardContainer from '@/components/landing/adCard/AdCardContainer'
import SearchAndFilter from '@/components/landing/adCard/SearchAndFilter'
import Icon from '@/components/landing/common/Icon'

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
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`
const categoryImages: { [key: string]: string } = {
  'Automóveis': '/categories/automoveis.svg',
  'Informática': '/categories/informatica.svg',
  'Roupas & Acessórios': '/categories/roupas_acessorios.svg'
}

export default function AdCard() {
  const { ads } = useContext(AdContext)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias')

  const handleSearch = (text: string, selectedCategory: string) => {
    setSearchText(searchText)
    setSelectedCategory(selectedCategory)
  }

  const filteredClassifieds = ads.filter((item) => {
    const matchesSearchText = item.name.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Todas as categorias' || item.category === selectedCategory
    return matchesSearchText && matchesCategory
  })

  return (
    <Area>
      <SearchAndFilter onSearch={handleSearch} />
      <StyledAdCard>
        {filteredClassifieds.map((item, index) => (
          <Link key={index} href={`/ad/${item.id}`} passHref legacyBehavior>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>
              <AdCardContainer key={index}>
                <Name>{item.name}</Name>
                <PostDate>Postado em {Data.ddmmyy.formatar(new Date(item.date))}</PostDate>
                <Price>{Dinheiro.formatar(item.price)}</Price>
                <Description>{item.description}</Description>
                <ItemContainer>
                  <img src={categoryImages[item.category]} alt={item.category} />
                  <Category>{item.category}</Category>
                </ItemContainer>
                <Category>{item.category}</Category>
              </AdCardContainer>
            </a>
          </Link>
        ))}
      </StyledAdCard>
    </Area>
  )
}
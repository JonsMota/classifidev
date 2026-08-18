import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  max-width: 704px;
  min-height: 56px;
  margin: 120px auto;
  border: 1px solid ${(props) => props.theme.searchBorder};
  border-radius: 10px;
  background-color: ${(props) => props.theme.searchBackground};
`

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 15px;
`

const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`

const Input = styled.input`
  flex: 1;
  min-width: 150px;
  height: 24px;
  border: none;
  background: transparent;
  padding: 0 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24.2px;
  color: ${(props) => props.theme.searchText};

  &::placeholder {
    color: ${(props) => props.theme.searchText};
  }

  &:focus {
    outline: none;
  }
`

const Separator = styled.div`
  width: 1px;
  height: 35px;
  border: 1px;
  margin: 0 15px;
  background-color: ${(props) => props.theme.searchText};
`

const CategorySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  min-width: 200px;
  height: 24px;
  margin: 0 15px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 20px;
  line-height: 24.2px;
  position: relative;
  color: ${(props) => props.theme.searchText};
`

const ContainerArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 10px;
  position: relative;
`

const ArrowIcon = styled.img`
  width: 10px;
  height: 5px;
`

const CategorySelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const categories = ['Todas as categorias', 'Automóveis', 'Informática', 'Roupas & Acessórios']

const SearchAndFilter = ({
  onSearch
}: {
  onSearch: (searchText: string, selectedCategory: string) => void
}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias')

  const handleSearch = useCallback(() => {
    onSearch(searchText, selectedCategory)
  }, [onSearch, searchText, selectedCategory])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <SearchContainer>
      <SearchIconContainer>
        <SearchIcon src="/icons/Lupa.svg" alt="Search" onClick={handleSearch} />
      </SearchIconContainer>
      <Input
        placeholder="Digite o que procura"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Separator />
      <CategorySelector>
        <span>{selectedCategory}</span>
        <ContainerArrowIcon>
          <ArrowIcon src="/icons/Seletor.svg" alt="Dropdown arrow" />
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </CategorySelect>
        </ContainerArrowIcon>
      </CategorySelector>
    </SearchContainer>
  )
}

export default SearchAndFilter

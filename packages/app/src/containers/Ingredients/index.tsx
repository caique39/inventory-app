import React, { useState } from 'react'
import styled from 'styled-components/native'
import Ripple from 'react-native-material-ripple'

import ProductOverview from 'components/ProductOverview'
import { BoldText, NormalText, MediumText } from 'components/Typography/Text'
import Container from 'components/Layout/Container'
import Navbar from 'components/Navbar'
import { Feather } from '@expo/vector-icons'
import AddIngredient from './AddIngredient'
import { IBaseProduct } from './interfaces'
import Ingredient from './Ingredient'
import Link from 'components/Link'
import Button from 'components/Button'

const Form = styled.ScrollView`
  flex: 1;
  border-top-width: 0;
  border: 1px solid #eee;
  background-color: #ffffff;
  padding: 12px 24px 16px 24px;
`

const FormTitle = styled(BoldText)`
  margin: 16px 0;
  font-size: 18px;
`

const AddProductItem = styled(Ripple).attrs({
  rippleOpacity: 0.1
})`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px #bdbdbd dashed;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const AddProductIcon = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
`

const AddProductText = styled.Text`
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 4px;
  margin-left: 17px;
  font-family: 'Poppins Medium';
`

const AddProductContainer = styled.View`
  margin-top: 16px;
`

const Footer = styled.View`
  width: 100%;
  padding: 12px 20px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eee;
  justify-content: space-between;
`

interface Props {
  t: (path: string) => string
  ingredients: IBaseProduct[]
  onChangeIngredient: (ingredients: IBaseProduct[]) => void
  onCreate: () => void
}

const ingredientsFromApi: IBaseProduct[] = [
  {
    id: '1',
    name: 'Carne de Hambúrguer',
    quantity: '1',
    unit: 'un'
  },
  {
    id: '2',
    name: 'Tomate',
    quantity: '1',
    unit: 'un'
  },
  {
    id: '3',
    name: 'Gel de cabelo',
    quantity: '1',
    unit: 'g'
  },
  {
    id: '4',
    name: 'Pomada capilar',
    quantity: '1',
    unit: 'g'
  }
]

const IngredientsContainer: React.SFC<Props> = ({
  t,
  ingredients,
  onChangeIngredient,
  onCreate
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<IBaseProduct>()
  const [addProductIsOpen, setAddProductDialogIsOpen] = useState<boolean>(false)

  const toggleAddProductDialog = () =>
    setAddProductDialogIsOpen(!addProductIsOpen)

  const handleEditIngredient = (ingredient: IBaseProduct) => {
    const updatedIngredientsList: IBaseProduct[] = ingredients.map(item => {
      if (item.id !== selectedIngredient.id) return item

      return ingredient
    })

    onChangeIngredient(updatedIngredientsList)
    toggleAddProductDialog()
    setSelectedIngredient(null)
  }

  const handleAddIngredient = (ingredient: IBaseProduct) => {
    onChangeIngredient([...ingredients, ingredient])
    toggleAddProductDialog()
  }

  const handleIngredientPress = (ingredient: IBaseProduct) => {
    setSelectedIngredient(ingredient)
    toggleAddProductDialog()
  }

  return (
    <>
      <Container>
        <Navbar title="Ingredientes" />
        <ProductOverview product={{ name: 'Pizza de mozzarela' }} />

        <Form>
          <FormTitle>{t('pos.create.ingredients')}</FormTitle>

          {ingredients.map(i => (
            <Ingredient
              key={i.id}
              onPress={handleIngredientPress}
              ingredient={i}
            />
          ))}

          <AddProductContainer>
            <AddProductItem onPress={toggleAddProductDialog}>
              <AddProductIcon>
                <Feather name="plus" size={18} color="#9e9e9e" />
              </AddProductIcon>
              <AddProductText>{t('pos.add')}</AddProductText>
            </AddProductItem>
          </AddProductContainer>
        </Form>

        <Footer>
          <Link onPress={() => {}}>Cancel</Link>

          <Button onPress={onCreate} text="Create product" />
        </Footer>
      </Container>

      <AddIngredient
        t={t}
        edit={!!selectedIngredient}
        defaultIngredient={selectedIngredient}
        ingredients={ingredientsFromApi}
        open={addProductIsOpen}
        onClose={toggleAddProductDialog}
        onFinish={handleAddIngredient}
        onEdit={handleEditIngredient}
      />
    </>
  )
}

export default IngredientsContainer

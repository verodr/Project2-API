import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const CocktailList = () => {
  const { spirit } = useParams()
  const [drinksList, setDrinksList] = useState()
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit}`)
      setDrinksList(data)
    //   console.log(data)
    }
    getData()
  }, [spirit])

  return (
    <Container as="main">
      <h1 className='text-center mb-4'>Drinks</h1>
      <Row> 
        { drinksList ? 
          <>
            { drinksList.drinks.map(item => {
              const { idDrink, strDrink, strDrinkThumb } = item
              console.log(item)
              return (
                <Col key={idDrink} md="6" lg="4" className='mb-4'>
                  <Link key={idDrink} to={`/${spirit}/${strDrink}`}>
                    <Card>
                      <p> { strDrink } </p>
                      <img src={strDrinkThumb} />
                    </Card>
                  </Link>
                </Col>
              )
            }) }
          </> : 'TODO - ERROR' }
      </Row>
    </Container>        
  )
}

export default CocktailList
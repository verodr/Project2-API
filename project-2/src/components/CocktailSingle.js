import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CocktailSingle = () => {
  const { name } = useParams()
  const [singleDrink, setSingleDrink] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      setSingleDrink(data)
    }
    getData()
    console.log(singleDrink)
  }, [name])

  const getIngredientList = (item) => { 
    const ingredients = Object.keys( item ).filter(it => {
      return item[it] !== null && it.indexOf('strIngredient') !== -1
    }
    ) 
    return ingredients.map(it=>{
      return item[it]
    })
  }

  return (
    <div> 
      { singleDrink ? 
        <>
          { singleDrink.drinks.map(item => {
            const { idDrink, strDrink, strDrinkThumb, strInstructions } = item
            return (
              <div key={idDrink}>
                <p> { strDrink } </p>
                <p>{ getIngredientList(item) }</p>
                <p> { strInstructions } </p>
                <img src={strDrinkThumb} />
              </div>
            )
          }) }
        </> : 'TODO - ERROR' }
    </div>
  )
}

export default CocktailSingle
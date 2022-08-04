import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CocktailSingle = () => {
  const { name } = useParams()
  const [singleDrink, setSingleDrink] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        data.drinks ? setSingleDrink(data) : setErrors(true)
      }  catch (err) {
        setErrors(true)
      }
    }
    getData()
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
        <h2 className="text-center">
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
        </h2> 
        : 
        <h4 className="text-center">
          { errors ? 'Something went wrong. Check page details' : 'Loading...'}
        </h4> }
    </div>
  )
}

export default CocktailSingle
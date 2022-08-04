import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

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
    <div> 
      { drinksList ? 
        <>
          { drinksList.drinks.map(item => {
            const { idDrink, strDrink, strDrinkThumb } = item
            console.log(item)
            return (
              <Link key={idDrink} to={`/${spirit}/${strDrink}`}>
                <p> { strDrink } </p>
                <img src={strDrinkThumb} />
              </Link>
            )
          }) }
        </> : 'TODO - ERROR' }
    </div>
  )
}

export default CocktailList
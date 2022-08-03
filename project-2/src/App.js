import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
      const data1 = data.drinks.map(it=>{ 
        return it.strDrink 
      })
      console.log(data1)
    }
    getData()
  })

  return <h1>Hello World</h1>
}

export default App

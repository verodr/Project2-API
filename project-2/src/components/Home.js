import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [page, setPage] = useState(null)
  //   const [spirits, setSpirits] = useState(null)

  const handleChange = (event) => {
    setPage(event.target.value)
  }

  //   useEffect(() => {
  //     const getData = async () => {
  //       const { data } = await axios.get('www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  //       setSpirits(data)
  //     }
  //     getData()
  //   }, [])

  return (
    <>
      <h1>Hello</h1>
      {/* <div> 
        { spirits ? 
          <>
            { spirits.drinks.map(item => {
              const { idDrink, strDrink, strDrinkThumb } = item
              console.log(item)
              return (
                <div key={idDrink}>
                  <p> { strDrink } </p>
                  <img src={strDrinkThumb} />
                </div>
              )
            }) }
          </> : 'TODO - ERROR' }
      </div> */}
      <select name="spirits" onChange={handleChange}>
        <option value="null" >Please Select</option>
        <option value="Vodka" >Vodka</option>
        <option value="Gin">Gin</option>
        <option value="Tequila">Tequila</option>
        <option value="Scotch">Scotch</option>
      </select>
      <Link className='btn dark' to={`/${page}`}> GO! </Link>
    </>
  )
}

export default Home
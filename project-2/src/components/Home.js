import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const Home = () => {
  const [page, setPage] = useState(null)
  //   const [spirits, setSpirits] = useState(null)

  const handleChange = (event) => {
    setPage(event.target.value)
  }


  return (
    <>
      <main className="hero text-center">
        <div className="hero-container">
          <h1 className='display-3'>Welcome to our Cocktail Library🍹</h1>
          <p className='lead'>Please select your favourite Spirit to find a Cocktail</p>
          <select name="spirits" onChange={handleChange}>
            <option value="null">Please Select</option>
            <option value="Vodka" >Vodka</option>
            <option value="Gin">Gin</option>
            <option value="Tequila">Tequila</option>
            <option value="Dark rum">Dark Rum</option>
            <option value="Scotch">Scotch</option>
            <option value="Brandy">Brandy</option>
            <option value="Bourbon">Bourbon</option>
            <option value="Kahlua">Kahlua</option>
            <option value="Triple sec">Triple Sec</option>
            <option value="Sweet Vermouth">Sweet Vermouth</option>
            <option value="Amaretto">Amaretto</option>
          </select>
          <Link className='btn dark' to={`/${page}`}> GO! </Link>
          <Link className='btn dark' to="/random">RANDOM DRINK</Link>
        </div>
      </main>
    </>
  )
}

export default Home
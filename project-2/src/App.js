import { useEffect } from 'react'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
// import axios from 'axios'

import Home from './components/Home'
import CocktailList  from './components/CocktailList'
import CocktailSingle from './components/CocktailSingle'
import PageNavbar from './components/PageNavbar'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/null" element={<NotFound />} />
          <Route path="/:spirit" element={<CocktailList />}/>
          <Route path="/:spirit/:name" element={<CocktailSingle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

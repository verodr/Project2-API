# PROJECT 2- “Cocktail Library”

## Description:

We were given the task of building a React application that consumes and uses a Public API.
It must have several components and be deployed online at the following location:

[cocktail-library.netlify.app](https://cocktail-library.netlify.app)

## Timeframe:

36 hours to complete the project. Veronica De Ronzi and Chris Rainey collaborating.

## Technologies Used:

- React
- React-Bootstrap
- Axios
- JavaScript
- SCSS
- Insomnia
- Slack

## Planning:

We decided quite quickly to use a cocktail and drinks API that can bring up cocktail recipes based on  their ingredients. We thought that this would be fun and interesting for people using the app and dare I say it, maybe useful.

We moved quickly with our plan so it could be signed off quickly and we could get started as we only have just over one day to complete.

We planned to create an home-page on load that welcomes the user and asks them to select an ingredient from a pre-loaded drop down of drink ingredients. 
After deciding on the API and wireframe together, we agreed that I would test the endpoints through Insomnia and Chris would do some research on the style. The next morning I was mainly dealing with the code of the  routes while Chris was concerned with applying bootstrap to create the different cards for the cocktails. On the second night, we split the task of completing the style: I worked on the home page, while he finished putting the style on the remaining routes.
We communicated through slack.

Once the user has selected an ingredient they press the shake button that we will animate with a drinks themed GIF. 
Also on the home-page we will have a navbar at the top that will remain in place no matter which page we are on, which will contain a home button, and a button to select random-drink.
The app will then direct the user to a results page bringing up all valid recipes. 
We will style these in a bootstrap card format that fits nicely on the screen and has the pictures prominent.
There will then be a link on each recipe card to see the recipe which will lead users to a single cocktail page that shows all of the ingredients, and other info.
We decided early on not to include all of the ingredients from the API in our drop-down. This is because some ingredients are in very few drinks and we want the user to have a decent amount of search results to look at. 
We took a look at numerous cocktails from the API and decided to use a list of 11 alcoholic spirits to populate our app.

## Wireframe: 
![image8](https://user-images.githubusercontent.com/106544788/193933420-659201b1-7b15-44b5-b1a6-c4e72c211a42.png)
## Build:
We created an App.js file with React routes to the following components:
1. Home:
Landing page with a dropdown list for the user to choose a spirit, shaker button and a random button. The function produces a bootstrap styled landing page which populates the list and the buttons. 
When clicking the shaker button the handleChange function activates storing the user’s choice using the ‘useState’ hook. 
A Link is then created to the cocktailList.js component.
Another Link is also activated by the user clicking the Random button. This Links to the RandomDrink.js component.
```javascript
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [page, setPage] = useState('Vodka')

  const handleChange = (event) => {
    setPage(event.target.value)
  }

  return (
    <>
      <main className="hero text-center">
        <div className="hero-container">
          <h1 className='display-3'>Welcome to our Cocktail Library</h1>
          <p className='lead'>Please select your favourite Spirit to find a Cocktail</p>
          <select name="spirits" id="dropDown" onChange={handleChange}>
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
          <Link className='btn dark' to={`/cocktail/${page}`}><input type="image" src="https://media1.giphy.com/media/UK7bIbbuf6TbXIUtab/giphy.gif?cid=0165a076jormipls6kcaev04dfhkb5bhz2uzwa1msd3gs4w4&rid=giphy.gif&ct=s" /></Link>
          <Link to="/random" className='btn dark' id = "randbtn">RANDOM DRINK</Link>
        </div>
      </main>
    </>
  )
}
export default Home
```
Homepage Image:
![image5](https://user-images.githubusercontent.com/106544788/193935292-1d7319ce-0206-4c27-825e-240e9a542fe8.png)
2. CocktailList.js
This component uses the ‘useParams’ hook to get the name of the spirit. It then uses the Axios get method to the API endpoint that returns the list of cocktails containing the spirit.
We check if the returned object is not empty and then we display the list of cocktails. We use the map method to get the name and the picture of each cocktail. 
On each name and picture we created a link to the CocktailSingle.js component.
Using Bootstraps ‘Container’, ‘Row’ and ‘Card’ classes we are able to produce a neat grid display of cards on the page with each card populated with the name of the spirit and its picture.
```javascript
const CocktailList = () => {
  const { spirit } = useParams()
  const [drinksList, setDrinksList] = useState()
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit}`)
        data.drinks ? setDrinksList(data) : setErrors(true)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [spirit])
```
Cocktail List Image:
![image1](https://user-images.githubusercontent.com/106544788/193935623-b288677f-4eaf-4fca-b982-e90a11f29273.png)
### CocktailSingle.js
This component uses the ‘useParams’ hook to get the name of the cocktail. Then using the Axios get method again to the API endpoint we get the details of the drink. We can then map the resulting objects to pick the information to be displayed on screen (name, image and recipe instructions).
We used another ‘useState’ hook to handle possible errors on the page on line 12. There are two possible errors: 1) the API request gives back an error code or 2) the API request is successful but returns an empty object (null).
```javascript
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
```
### Cocktail Single 
Image:![image6](https://user-images.githubusercontent.com/106544788/193935871-c7914d70-9c13-42ea-ba16-1359ab3d5339.png)
### RandomDrink.js
This component uses axios.get to the API endpoint that returns a random cocktail. From the random API we produce a single random cocktail card in the same format as CocktailSingle.js
```javascript
const RandomDrink = () => {

  const [singleDrink, setSingleDrink] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        data.drinks ? setSingleDrink(data) : setErrors(true)
      }  catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  const getIngredientList = (item) => { 
    const ingredients = Object.keys( item ).filter(it => {
      return item[it] !== null && it.indexOf('strIngredient') !== -1
    }
    ) 
    return ingredients.map(it=>{
      return item[it]
    })
  }
```
## Challenges:

1. We had an error on our drop-down menu. When the page loaded the drop-down was populated with ‘Please Select’. If the user didn’t select a spirit and clicked the ‘shaker’ button a 404 error would be produced:
```javascript
const Home = () => {
  const [page, setPage] = useState('Vodka')

  const handleChange = (event) => {
    setPage(event.target.value)
  }
```
This was fixed by having the state as Vodka on load. This meant ‘Please Select’ was no longer an option as it wasn’t on the list

2. We had a challenge with extracting the ingredients from the API returned object. We overcame this by using a filter method on the object keys returning those that are not ‘null’ and contain ‘strIngredient’ as a substring:

```javascript
  const getIngredientList = (item) => { 
    const ingredients = Object.keys( item ).filter(it => {
      return item[it] !== null && it.indexOf('strIngredient') !== -1
    }
    ) 
    return ingredients.map(it=>{
      return item[it]
    })
  }
```
The result of the first filter (const ingredients) contains only key-value pairs that passed the filter.
For example, the key part contains the substring ‘strIngredient’ and the value part is not null. Then the following ‘map’ method is needed to return the value part of the ingredients.

3. We couldn’t seem to get the blue underlines removed from the names of our cocktails when in a list:
![image7](https://user-images.githubusercontent.com/106544788/193936333-8428f376-8556-4226-8200-83ceb776f497.png)
This was because in the code on line 39 the name is produced by using a Link to another component. This produces a tag but isn’t obvious to see.
```javascript
  return (
    <div className='list-wrapper'>
      <Container className='list-container'>
        <h1 className='text-center mb-4'>Drinks</h1>
        <Row> 
          { drinksList ? 
            <>
              { drinksList.drinks.map(item => {
                const { idDrink, strDrink, strDrinkThumb } = item
                console.log(item)
                return (
                  <Col key={idDrink} md="6" lg="4" className='mb-4'>
                    <Link key={idDrink} to={`/cocktail/${spirit}/${strDrink}`}>
                      <Card className='list-card'>
                        <p className='text-center'> { strDrink } </p>
                        <img src={strDrinkThumb} />
                      </Card>
                    </Link>
                  </Col>
                )
              }) }
            </> 
```
Once we knew this we could style the a tag with text-decoration: none.

## Wins:
I learned a lot about the challenges that can arise in teamwork and I am happy that with my partner we managed to achieve an excellent result thanks to our way of organising work.

I am very proud to have been able to implement the new technologies learned to create and obtain such a professional product.

## Key Learnings and Takeaways:
This project gave me the opportunity to learn how to use API-endpoints through Insomnia and to gain experience with React and Bootstrap.

## Bugs
There are no obvious bugs.

## Future Improvements:
- Take more advantage of the information that an API can provide.

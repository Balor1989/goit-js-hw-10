import countryCardTpl from "./templates/country.hbs"
import { debounce } from "lodash.debounce"

const refs = {
inputCountry: document.querySelector('[id = search-box]'), 
countryInfo: document.querySelector('.country-info'),
}

const onInputValue = (e) => {
  let x = ''
    x = e.target.value
    console.log(x)
  fetch(`https://restcountries.com/v3.1/name/${x}?fields=name,capital,population,flags,languages`)
  .then(response => {
      return response.json()
    })
    .then(country => {
     const markup = countryCardTpl(country)
    refs.countryInfo.innerHTML = markup
    })
    .catch(error => {
      return error
    });
}
refs.inputCountry.addEventListener('input', debounce(onInputValue, 300))


 
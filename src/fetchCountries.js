import countryCardTpl from "./templates/country.hbs"
import debounce from "lodash.debounce"
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
inputCountry: document.querySelector('[id = search-box]'), 
countryInfo: document.querySelector('.country-info'),
}

const onInputValue = (e) => {
  let x = ''
  x = e.target.value
  if (x === '') {
    refs.countryInfo.innerHTML = ''
    return
  }
  fetch(`https://restcountries.com/v3.1/name/${x.trim()}?fields=name,capital,population,flags,languages`)
  .then(response => {
      return response.json()
    })
    .then(country => {
      if (country.length > 10)
      {
        Notify.info('Too many matches found. Please enter a more specific name.');
          refs.countryInfo.innerHTML = ''
        return
        }
     const markup =countryCardTpl(country)
    refs.countryInfo.innerHTML = markup
    })
    .catch(error => {
      return Notify.failrue('Too many matches found. Please enter a more specific name.');
    });

}




refs.inputCountry.addEventListener('input', debounce(onInputValue, 500))


console.log(refs.inputCountry.currentTarget)


 
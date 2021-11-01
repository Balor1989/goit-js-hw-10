import countryCardTpl from "./templates/country.hbs"
import countryListTpl from "./templates/flag-and-name.hbs"
import debounce from "lodash.debounce"
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
inputCountry: document.querySelector('[id = search-box]'), 
  countryInfo: document.querySelector('.country-info'),
 countryList: document.querySelector('.country-list')
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
      if (country.length === 1) {
        const markup = countryCardTpl(country)
        refs.countryInfo.innerHTML = markup
        return
      }
     
      if (country.status === 404) {
        Notify.info('Oops, there is no country with that name.');
        return
      }
      const markup = country.map(countryListTpl).join('')
      refs.countryList.innerHTML = markup
      })
    .catch(error => {
      
    });

}




refs.inputCountry.addEventListener('input', debounce(onInputValue, 500))


console.log(refs.inputCountry.currentTarget)


 
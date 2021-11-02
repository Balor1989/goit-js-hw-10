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
          refs.countryList.innerHTML=''
        return
      }
      if (country.length === 1) {
        refs.countryList.innerHTML=''
        const markup = countryCardTpl(country)
        refs.countryInfo.innerHTML = markup
        return
      }
     
      if (country.status === 404) {
        refs.countryList.innerHTML=''
        refs.countryInfo.innerHTML=''
        Notify.failure('Oops, there is no country with that name.');
        return
      }
      refs.countryList.innerHTML=''
      refs.countryInfo.innerHTML=''
      const markup = country.map(countryListTpl).join('')
      refs.countryList.innerHTML = markup
      })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name.');
    });

}




refs.inputCountry.addEventListener('input', debounce(onInputValue, 300))


console.log(refs.inputCountry.currentTarget)


 
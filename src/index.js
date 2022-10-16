import card from './templates/card.hbs'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery = document.querySelector('.gallery');
const btnMore=document.querySelector('.load-more')

const axios = require('axios').default;
const form = document.querySelector('.search-form');
let page = 1;
const MAIN_URL_WITH_KEY = 'https://pixabay.com/api/?key=30629726-597c78df0089c177162f75c58';

async function getUser() {
  try {
    const response = await axios.get(`${MAIN_URL_WITH_KEY}`,{
  params:{
  q: form.elements.searchQuery.value,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: `${page}`,
  per_page: '40'}
});
    if (response.data.totalHits === 0) {
     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      Notiflix.Notify.success(`SHooray! We found ${response.data.totalHits} images.`);
    };
    gallery.insertAdjacentHTML('afterbegin', response.data.hits.map(card).join(''));
    const lightbox = new SimpleLightbox('.gallery a', {captionsData:'alt',captionDelay:250});
  } catch (error) {
    console.error(error);
  }
}

const onSubmitClick = event => {
   gallery.innerHTML = '';
  event.preventDefault();
  page = 1;
  getUser()
 
    
    
}
form.addEventListener('submit', onSubmitClick);
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchchImages } from './js/fetchimages';
import { renderImages } from './js/renderImages';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  buttonSubmit: document.querySelector('[type="submit"]'),
  searchQuery: document.querySelector('[name="searchQuery"]'),
  buttonLoadMore: document.querySelector('.load-more'),
};
refs.buttonLoadMore.classList.add('is-hidden');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
let numberOfPage = 1;

refs.buttonSubmit.addEventListener('click', onBtnClick);

async function onBtnClick(evt) {
  evt.preventDefault();

  try {
    if (refs.searchQuery.value === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      clearGalleryData();
      const images = await fetchchImages(refs.searchQuery.value, numberOfPage);
      const renderAllImages = await renderImages(images.hits);
      gallerySimpleLightbox.refresh();

      if (images.hits.length === 0) {
        refs.buttonLoadMore.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
        refs.buttonLoadMore.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  }
}

refs.buttonLoadMore.addEventListener('click', loadMoreImages);

function clearGalleryData() {
  refs.gallery.innerHTML = '';
}
async function loadMoreImages() {
  numberOfPage += 1;
  const images = await fetchchImages(refs.searchQuery.value, numberOfPage);
  const renderAllImages = await renderImages(images.hits);
  gallerySimpleLightbox.refresh();
  if (numberOfPage >= Math.round(images.totalHits / 40)) {
    refs.buttonLoadMore.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

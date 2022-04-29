import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './js/api-service';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');

const apiService = new ApiService();
let totalImages = 0;
const totalHits = onSearch.hits;


searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', fetchGallery);

loadMoreBtn.classList.add('is-hidden');

async function onSearch(event) {
    event.preventDefault();
    
    clearImagesContainer();
    apiService.query = event.currentTarget.elements.searchQuery.value;
    apiService.resetPage();
    totalImages = 0;
    fetchGallery();
    loadMoreBtn.classList.remove('is-hidden');
}

async function fetchGallery() {
    try {
        const renderGallery = await apiService.fetchImages();
    return renderImages(renderGallery);
    }
    catch (error) {
        console.log(error);
    }
}

function renderImages(images) {
    if (images.hits.length === 0) {
        loadMoreBtn.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
    } else {
        const markup = images.hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
        <div class="info">
        <p class="info-item">
            <b>Likes</b><br>${likes}
        </p>
        <p class="info-item">
            <b>Views</b><br>${views}
        </p>
        <p class="info-item">
            <b>Comments</b><br>${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b><br>${downloads}
        </p>
        </div>
        </div>`
    ).join('');

        galleryContainer.insertAdjacentHTML('beforeend', markup);
        loadMoreBtn.classList.remove('is-hidden');
    }

    totalImages += 40;
    if (totalImages === 40) {
        Notify.success(`We found ${images.totalHits} images for you.`);
    }
    
    if (images.totalHits <= totalImages) {
        loadMoreBtn.classList.add('is-hidden');
        Notify.warning(`We're sorry, but you've reached the end of search results.`);
    }
}

function clearImagesContainer() {
    galleryContainer.innerHTML = '';
}
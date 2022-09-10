import { Notify } from "notiflix";
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import NewsApiService from './news-service';
import renderImageCards from './render-interface';

const newsApiService = new NewsApiService;

export const refs = {
    form: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button.load-more'),
}

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galleryContainer.addEventListener('click', showModal);

function onSearch(evt) {
    evt.preventDefault();
    
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage(); 
    onFirstRequest();
}

async function onFirstRequest() {
    try {
        const { data } = await newsApiService.fetchImages();
        if (data.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        } 
        renderImageCards(data.hits);
        switchBtnVisability();
    } catch (error) {
        console.log(error);
    }
}

async function onLoadMore(searchQuery) {
    switchBtnVisability();
    try {
        const { data } = await newsApiService.fetchImages(searchQuery);
        renderImageCards(data.hits);
        switchBtnVisability();
    } catch (error) {
        console.log(error);
    }
}

function switchBtnVisability() {
    refs.loadMoreBtn.classList.toggle('is-hidden');
}

function showModal(evt) {
    evt.preventDefault();
    if (!evt.target.nodeName === 'IMG') {
        return;
    }
    let gallery = new simpleLightbox('.gallery a');
}
// gallery.refresh()

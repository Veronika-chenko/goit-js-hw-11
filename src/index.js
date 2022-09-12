import { Notify } from "notiflix";
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import NewsApiService from './news-service';
import renderImageCards from './render-interface';


const newsApiService = new NewsApiService;
let isReceivedQuantity = 0;

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

    refs.galleryContainer.innerHTML = "";
    if (isReceivedQuantity !== 0) {
        isReceivedQuantity = 0;
    }
    onFirstRequest();
}

async function onFirstRequest() {
    try {
        const { data } = await newsApiService.fetchImages();

        onFirstRender(data.hits, data.totalHits);
    } catch (error) {
        console.log(error);
    }
}
       
async function onLoadMore(searchQuery) {
    switchBtnVisability();
    try {
        const { data } = await newsApiService.fetchImages(searchQuery);
        const dataHits = data.hits;
        const totalHits = data.totalHits;

        isReceivedQuantity += dataHits.length;
        onLoadMoreRender(isReceivedQuantity, dataHits, totalHits);
        return isReceivedQuantity;
    } catch (error) {
        console.log(error);
    }
}

function onFirstRender(receivedHits, totalHits) {
    if (receivedHits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    } 
    
    if (receivedHits.length >= 1 && receivedHits.length === Number(totalHits)) {
        renderImageCards(receivedHits);
        
        Notify.info("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
    }

    if (receivedHits.length >= 1) {
        isReceivedQuantity = receivedHits.length;

        renderImageCards(receivedHits);
        Notify.success(`Hooray! We found ${totalHits} images.`);
        switchBtnVisability();

        return isReceivedQuantity;
    }
}

function onLoadMoreRender(isReceivedQuantity, dataHits, totalHits) {
    if (dataHits.length >= 1 && isReceivedQuantity === Number(totalHits)) {
        renderImageCards(dataHits);
        Notify.info("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
    }

    if (dataHits.length >= 1) {
        renderImageCards(dataHits);
        switchBtnVisability();
        return;
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
//gallery.refresh();

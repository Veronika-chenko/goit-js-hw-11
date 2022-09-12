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
    refs.galleryContainer.innerHTML = "";
    onFirstRequest();
}

let alreadyWatched = 0;

async function onFirstRequest() {
    try {
        const { data } = await newsApiService.fetchImages();
        const totalHits = data.totalHits;
        if (data.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        } 
        // for amadeus mozart 7:
        if (data.hits.length >= 1 && data.hits.length === Number(totalHits)) {
            renderImageCards(data.hits);
            console.log(`hits.length: ${data.hits.length}, totalHits: ${Number(totalHits)}`);//
            Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.classList.add('is-hidden');

            alreadyWatched = data.hits.length;
            console.log("alreadyWatched:", alreadyWatched);
            return alreadyWatched;
        }
        if (data.hits.length >= 1) {
            renderImageCards(data.hits);
            Notify.success(`Hooray! We found ${totalHits} images.`);
            switchBtnVisability();

            alreadyWatched = data.hits.length;
            console.log("alreadyWatched:", alreadyWatched);
            return alreadyWatched;
        }
    } catch (error) {
        console.log(error);
    }
}
       
async function onLoadMore(searchQuery) {
    switchBtnVisability();
    try {
        const { data } = await newsApiService.fetchImages(searchQuery);
        const totalHits = data.totalHits;
        alreadyWatched += data.hits.length;
        if (alreadyWatched >= 1 && alreadyWatched === Number(totalHits)) {
            renderImageCards(data.hits);
            console.log(`onLoadMOre:: hits.length: ${data.hits.length}, totalHits: ${Number(totalHits)}`);//
            Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.classList.add('is-hidden');

            // alreadyWatched += data.hits.length;
            console.log("alreadyWatched in loadMore1:", alreadyWatched);
            return alreadyWatched;
        }
        if (alreadyWatched >= 1) {
            renderImageCards(data.hits);
            switchBtnVisability();

            // alreadyWatched += data.hits.length;
            console.log("alreadyWatched in loadMore2:", alreadyWatched);
            return alreadyWatched;
        }
        
        // switchBtnVisability();
    } catch (error) {
        console.log(error);
    }
}

function switchBtnVisability() {
    refs.loadMoreBtn.classList.toggle('is-hidden');
}

// function isTotalHits(dataHits, totalHits) {
//     if (dataHits.length === Number(totalHits)) {
//         Notify.info("We're sorry, but you've reached the end of search results.");
//         refs.loadMoreBtn.classList.add('is-hidden');
//         return;
//     }
//     switchBtnVisability();
// }

function showModal(evt) {
    evt.preventDefault();
    if (!evt.target.nodeName === 'IMG') {
        return;
    }
    let gallery = new simpleLightbox('.gallery a');
}
//gallery.refresh();

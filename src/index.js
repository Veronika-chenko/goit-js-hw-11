import { Notify } from "notiflix";
import NewsApiService from './news-service';
import renderImageCard from './render-interface';

export const refs = {
    form: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button.load-more'),
}

refs.loadMoreBtn.classList.add('is-hidden');
const newsApiService = new NewsApiService;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(evt) {
    evt.preventDefault();
    
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchImages()
        .then(data => {
        if (data.hits.length === 0) {
            Notify.info("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        
        renderImageCard(data.hits);
        refs.loadMoreBtn.classList.remove('is-hidden');
        })
        .catch(error => console.log(error))
    
}

function onLoadMore(searchQuery) {
    switchBtnVisability() 
    newsApiService.fetchImages(searchQuery)
        .then(data => {
            renderImageCard(data.hits);
            
        }).then(switchBtnVisability)
        .catch(error => console.log(error))
    
}

function switchBtnVisability() {
    refs.loadMoreBtn.classList.toggle('is-hidden');
}

import { Notify } from "notiflix";
import NewsApiService from './news-service';
import renderImageCard from './render-interface';

export const refs = {
    form: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button.load-more'),
}

const newsApiService = new NewsApiService;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(evt) {
    evt.preventDefault();
    
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchImages().then(hits => {
        renderImageCard(hits);
    })
}
function onLoadMore(searchQuery) {
    newsApiService.fetchImages(searchQuery).then(hits => renderImageCard(hits));
}

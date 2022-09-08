const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=29745254-668a4ef84f81b3be2971a230f';

export default class NewsApiServise {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    
    async fetchImages() {
        const QUERY_PARAMS = `&q=${this.searchQuery}&
        image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const resourceUrl = BASE_URL + API_KEY + QUERY_PARAMS;
    
        const responce = await fetch(resourceUrl);
        const {hits} = await responce.json();
        this.incrementPage();
        return hits;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

import axios from "axios";
import { Notify } from "notiflix";
import { refs } from "./index";


const api = axios.create({
    baseURL: 'https://pixabay.com/api/'
})
const API_KEY = '?key=29745254-668a4ef84f81b3be2971a230f';

export default class NewsApiServise {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    
    async fetchImages() {
        const QUERY_PARAMS = `&q=${this.searchQuery}&
        image_type=photo&orientation=horizontal&safesearch=true`;
        const paginationParams = `&page=${this.page}&per_page=40`;
        
        try {
            const response = await api.get(API_KEY + QUERY_PARAMS + paginationParams);
            this.incrementPage();

            return response;
        } catch (error) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.classList.add('is-hidden');
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

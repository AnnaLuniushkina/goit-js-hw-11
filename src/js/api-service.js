import axios from "axios";

const API_KEY = '27074906-6b0d11fe5ed8fe7df06d975aa';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    async fetchImages() {
        console.log(this);
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        const response = await axios.get(url);

        this.page += 1;

        return response.data;
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

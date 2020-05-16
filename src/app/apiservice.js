import axios from 'axios'

const httpClient = axios.create({
    baseURL : 'http://localhost:8080'
});

class ApiService {
    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    post(url, obj){
        const requestedUrl = `${this.apiUrl}${url}`;
        return httpClient.post(requestedUrl, obj);
    }

    put(url, obj){
        const requestedUrl = `${this.apiUrl}${url}`;
        return httpClient.put(requestedUrl, obj);
    }

    delete(url){
        const requestedUrl = `${this.apiUrl}${url}`;
        return httpClient.delete(requestedUrl);
    }

    get(url){
        const requestedUrl = `${this.apiUrl}${url}`;
        return httpClient.get(requestedUrl);
    }
}

export default ApiService;
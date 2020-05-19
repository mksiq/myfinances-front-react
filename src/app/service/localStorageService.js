class LocalStorageService {
    
    static addItem(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key){
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    }
}

export default LocalStorageService;
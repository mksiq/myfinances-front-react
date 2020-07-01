import LocalStorageService from './localstorage-service'

export default class AuthService {

    static isUserAuthenticated(){
        const user = LocalStorageService.getItem('_logged_user');
        return user && user.id;
    }

    static logoutUser(){
        LocalStorageService.dropItem('_logged_user');
    }

    static login(user){
        LocalStorageService.addItem('_logged_user', user);
    }

    static getUser(){
        return LocalStorageService.getItem('_logged_user');
    }
}
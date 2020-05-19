import ApiService from '../apiservice'

class UserService extends ApiService{
    constructor(){
        super('/api/users');
    }

    authenticate(credentials){
        return this.post('/authenticate', credentials);
    }

    getBalanceByUserId(id){
        return this.get(`/${id}/balance`)
    }

    insert(user){
        return this.post('', user);
    }

}

export default UserService;

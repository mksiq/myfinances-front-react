import ApiService from '../apiservice'
import ValidationError from '../exception/validation-error'

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

    validate(user){
        const messages = [];
        if(!user.name){
            messages.push('You need to type a name.');
        }
        if(!user.email){
            messages.push('You need to type an email.');
        } else if (!user.email.match(/^[a-z0-9._]+@[a-z0-9_]+\.[a-z]/)){
            messages.push('You need to type a valid email.');
        }
        if(!user.password){
            messages.push('You need to type an password.');
        }
        if(!user.confirmPassword){
            messages.push('You need to confirm your password.');
        }
        if(user.password !== user.confirmPassword ){
            messages.push('Your password does not match.');
        }

        if(messages && messages.length > 0){
            throw new ValidationError(messages);
        }
    }

}

export default UserService;

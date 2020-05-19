import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UserService from '../app/service/user-service'
import { successMessage, errorMessage } from '../components/toastr'


class UserSignUp extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    constructor(){
        super();
        this.service = new UserService();
    }

    validate(){
        const messages = [];
        if(!this.state.name){
            messages.push('You need to type a name.');
        }
        if(!this.state.email){
            messages.push('You need to type an email.');
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            messages.push('You need to type a valid email.');
        }
        if(!this.state.password){
            messages.push('You need to type an password.');
        }
        if(!this.state.confirmPassword){
            messages.push('You need to confirm your password.');
        }
        if(this.state.password !== this.state.confirmPassword ){
            messages.push('Your password does not match.');
        }

        return messages;
    }

    signup = () => {
        const messages = this.validate();
        if(messages && messages.length > 0){
            messages.forEach( (msg, index) => {
                errorMessage(msg)
            });
            return false;
        }
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        this.service.insert(user)
            .then( res  => {
                successMessage('User registered. Login to enter');
                this.props.history.push('/login');
            }).catch( e => {
                errorMessage(e.response.data);
            });

    }

    cancel = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="User Sign Up">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Name: *" htmlFor="inputName">
                                <input type="text"
                                    id="inputName"
                                    className="form-control"
                                    name="name"
                                    onChange={e => this.setState({ name: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Password: *" htmlFor="inputPassword">
                                <input type="password"
                                    id="inputPassword"
                                    className="form-control"
                                    name="password"
                                    onChange={e => this.setState({ password: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Confirm Password: *" htmlFor="inputConfirmPassword">
                                <input type="password"
                                    id="inputConfirmPassword"
                                    className="form-control"
                                    name="confirmPassword"
                                    onChange={e => this.setState({ confirmPassword: e.target.value })} />
                            </FormGroup>
                            <button onClick={this.signup} type="button" className="btn btn-success">Sign Up!</button>
                            <button onClick={this.cancel} type="button" className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(UserSignUp);
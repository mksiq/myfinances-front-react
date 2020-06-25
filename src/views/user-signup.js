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



    signup = () => {

        const {name,
            email,
            password,
            confirmPassword } = this.state;

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        try {
            this.service.validate(user);
        } catch (error) {
            const msgs = error.msgs;
            msgs.forEach(msg => errorMessage(msg));
            return false;
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
import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom'
import UserService from '../app/service/user-service'
import LocalStorageService from '../app/service/localstorage-service'
import { errorMessage } from '../components/toastr'



class Login extends React.Component {
    
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    constructor(){
        super();
        this.service = new UserService();
    }

    login = () => {
        this.service.authenticate({
            email : this.state.email,
            password : this.state.password
        }).then( response => {
            LocalStorageService.addItem('_logged_user',response.data);
            this.props.history.push('/home')
        }).catch( e => {
           errorMessage(e.response.data);
        });
    }

    prepareSignup = () => {
        this.props.history.push('/user-signup')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <fieldset>
                                <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                    <input type="email"
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })}
                                        className="form-control"
                                        id="inputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Insert your e-mail" />
                                </FormGroup>
                                <FormGroup label="Password: *" htmlFor="inputPassword">
                                    <input type="password" className="form-control"
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value })}
                                        id="inputPassword1"
                                        placeholder="Password" />
                                </FormGroup>
                                <button onClick={this.login} className="btn btn-success">Login</button>
                                <button onClick={this.prepareSignup} className="btn btn-danger">Sign Up</button>
                            </fieldset>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login) 
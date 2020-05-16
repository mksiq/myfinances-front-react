import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }

    login = () => {
        console.log('Email: ', this.state.email);
        console.log('Password: ', this.state.password);
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
import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group';

class Login extends React.Component{
    state = {
        email : '',
        password: ''
    }
    
    login = () => {
        console.log('Email: ', this.state.email);
        console.log('Password: ', this.state.password);
    }

    render(){
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <form>
                                        <fieldset>
                                            <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                                <input type="email"
                                                value={this.state.email}
                                                onChange={event => this.setState({email: event.target.value})}
                                                className="form-control"
                                                id="inputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Insert your e-mail"/>
                                            </FormGroup>
                                            <FormGroup label="Password: *" htmlFor="inputPassword">
                                                <input type="password" className="form-control"
                                                 value={this.state.password}
                                                 onChange={event => this.setState({password: event.target.value})}
                                                id="inputPassword1"
                                                placeholder="Password"/>
                                            </FormGroup>
                                            <button onClick={this.enter} className="btn btn-success">Login</button>
                                            <button onClick={this.login} className="btn btn-danger">SignUp</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>                    
                        </div>    
                        </Card>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Login
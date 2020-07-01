import React from 'react'
import { withRouter } from 'react-router-dom'

import UserService from '../app/service/user-service'
import { AuthContext } from '../main/authenticationProvider'

class Home extends React.Component {
    
    state = {
        balance : 0,
        user : '{username}'
    }

    constructor(){
        super();
        this.userService = new UserService();
        
    }

    componentDidMount(){
        if(this.context.authenticatedUser){
           const loggedUser = this.context.authenticatedUser;
    
           this.userService
               .getBalanceByUserId(loggedUser.id)
               .then(res => {
                   this.setState({ balance : res.data });
                   this.setState({ user : loggedUser.name });
               }).catch(e => {
                   console.log(e.response);
               });

        } else {
            this.props.history.push('/login');
        }

    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">hello, {this.state.user}!</h1>
                <p className="lead">This is your personal finance app.</p>
                <p className="lead">Your balance for this month is CAD { new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(this.state.balance) }.</p>
                <hr className="my-4" />
                <p>This is your dashboard, choose what to do.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/user-signup"
                        role="button"><i className="pi pi-user"></i> Register User</a>
                    <a className="btn btn-danger btn-lg"
                        href="#/register-transactions"
                        role="button"><i className="pi pi-money-bill"></i> Register Transaction</a>
                </p>
            </div>
        );
    }
}

Home.contextType = AuthContext;

export default withRouter(Home);
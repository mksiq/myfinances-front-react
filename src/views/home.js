import React from 'react'
import { withRouter } from 'react-router-dom'

class Home extends React.Component {
    
    state = {
        balance : 0,
        user : '{username}'
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Hello, {this.state.user}!</h1>
                <p className="lead">This is your personal finance app.</p>
                <p className="lead">Your balance for this month is CAD$ {this.state.balance}</p>
                <hr className="my-4" />
                <p>This is your dashboard, choose what to do.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/user-signup"
                        role="button"><i className="fa fa-users"></i> Register User</a>
                    <a className="btn btn-danger btn-lg"
                        href="https://bootswatch.com/superhero/#"
                        role="button"><i className="fa fa-users"></i> Register Transaction</a>
                </p>
            </div>
        );
    }
}

export default withRouter(Home);
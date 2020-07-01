import React from 'react'
import { Route, Switch , HashRouter, Redirect } from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import UserSignUp from '../views/user-signup'
import SeachTransaction from '../views/transactions/search-transactions'
import RegisterTransaction from '../views/transactions/register-transaction'
import { AuthConsumer } from '../main/authenticationProvider'

function AuthenticatedRoute( { component: Component }, isUserAuthenticated, ...props ){
    return (
        <Route {...props} render ={ (componentProps) => {
            if(isUserAuthenticated){
                return (
                    <Component {...componentProps}/>
                );
            } else {
                return (
                    <Redirect to={ {pathname : '/login', state : {from: componentProps.location}} }/>
                );
            }
        } } />
    );
}

function Routes(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/user-signup" component={UserSignUp} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/home" component={Home} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/search-transactions" component={SeachTransaction}/>
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/register-transactions/:id?" component={RegisterTransaction}  />
            </Switch>
        </HashRouter>
    );
}



export default () => (
    <AuthConsumer>
        {(context) => (<Routes isUserAuthenticated={context.isAuthenticated}/>)

        }
    </AuthConsumer>
);
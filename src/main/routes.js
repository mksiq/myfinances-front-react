import React from 'react'
import { Route, Switch , HashRouter } from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import UserSignUp from '../views/user-signup'
import SeachTransaction from '../views/transactions/search-transactions'
import RegisterTransaction from '../views/transactions/register-transaction'

function Routes(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/user-signup" component={UserSignUp} />
                <Route path="/home" component={Home} />
                <Route path="/search-transactions" component={SeachTransaction}/>
                <Route path="/register-transactions/:id?" component={RegisterTransaction}  />
            </Switch>
        </HashRouter>
    );
}

export default Routes;
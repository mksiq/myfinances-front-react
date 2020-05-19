import React from 'react'
import { Route, Switch , HashRouter } from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import UserSignUp from '../views/user-signup'
import SeachTransaction from '../views/search-transactions'

function Routes(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/user-signup" component={UserSignUp} />
                <Route path="/home" component={Home} />
                <Route path="/search-transactions" component={SeachTransaction} />
            </Switch>
        </HashRouter>
    );
}

export default Routes;
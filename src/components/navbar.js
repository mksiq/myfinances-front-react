import React from 'react'

import NavbarItem from './navbar-item'
import { AuthConsumer } from '../main/authenticationProvider'

function Navbar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">My Finances</a>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aaria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUserAuthenticated} href="#/home" label="Home" />
                        <NavbarItem render={props.isUserAuthenticated} href="#/user-signup" label="Users" />
                        <NavbarItem render={props.isUserAuthenticated} href="#/search-transactions" label="Transactions" />
                        <NavbarItem render={props.isUserAuthenticated} onClick={props.signOut} href="#/login" label="Logout" />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUserAuthenticated={context.isAuthenticated} signOut={context.endSession}/>
        )}
    </AuthConsumer>
)
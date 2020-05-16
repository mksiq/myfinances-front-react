import React from 'react'

import NavbarItem from './navbar-item'

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="home.html" className="navbar-brand">My Finances</a>
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
                        <NavbarItem href="#/home" label="Home" />
                        <NavbarItem href="#/user-signup" label="Users" />
                        <NavbarItem href="#/" label="Transactions" />
                        <NavbarItem href="#/login" label="Login" />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
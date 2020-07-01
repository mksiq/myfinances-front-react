import React from 'react'
import AuthService from '../app/service/auth-service'

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        authenticatedUser: null,
        isAuthenticated: false
    }

    startSession = (user) => {
        console.log(user.name + " on authenticationProvider.js")
        AuthService.login(user);
        this.setState({isAuthenticated: true, authenticatedUser: user});
    }

    endSession = (user) =>{
        AuthService.logoutUser(user);
        this.setState({isAuthenticated: false, authenticatedUser: null});
    }

    render(){
        const context = {
            isAuthenticated: this.state.isAuthenticated,
            authenticatedUser: this.state.authenticatedUser,
            startSession: this.startSession,
            endSession: this.endSession
        };

        return (
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        );
    }
}

export default AuthenticationProvider;
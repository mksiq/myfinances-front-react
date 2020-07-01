import React from 'react';
import Routes from './routes'
import Navbar from '../components/navbar'
import AuthenticationProvider from './authenticationProvider'

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'
import 'toastr/build/toastr.min'

import 'bootswatch/dist/superhero/bootstrap.css'
import '../custom.css'

import 'primereact/resources/themes/nova-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


class App extends React.Component {
  render() {
    return (
      <AuthenticationProvider>
      <>
      <div>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </div>
      </>
      </AuthenticationProvider>
    );
  }
}

export default App;

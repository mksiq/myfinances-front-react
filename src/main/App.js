import React from 'react';
import Routes from './routes'
import Navbar from '../components/navbar'

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.css'
import 'toastr/build/toastr.min'

import 'bootswatch/dist/superhero/bootstrap.css'
import '../custom.css'

class App extends React.Component {
  render() {
    return (
      <>
      <div>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </div>
      </>
    );
  }
}

export default App;

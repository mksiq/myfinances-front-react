import React from 'react';
import 'bootswatch/dist/superhero/bootstrap.css'
import '../custom.css'

import Routes from './routes'
import Navbar from '../components/navbar'


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

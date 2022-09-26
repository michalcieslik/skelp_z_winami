import './App.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

class App extends React.Component {
    render() { return( 
        <Router>
            <Routes/>  
        </Router>
      )
    }
}

export default App;
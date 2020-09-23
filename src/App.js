import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navigation />
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/map" component={MapScreen} />
        </main>
        <footer className="footer fixed-bottom bg-dark text-white text-center p-3">Footer</footer>
      </div>
    </BrowserRouter> 
  );
}

export default App;

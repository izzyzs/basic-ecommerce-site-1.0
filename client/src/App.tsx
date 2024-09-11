import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import Hair from './pages/Hair';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path='/hair' element={<Hair />}/>
          <Route />
          <Route />
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;

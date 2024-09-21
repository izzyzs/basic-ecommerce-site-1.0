import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import HeaderComponent from './components/every_page_components/HeaderComponent';
import FooterComponent from './components/every_page_components/FooterComponent';
import WelcomePage from './pages/WelcomePage';
import HairPage from './pages/HairPage';
import MenPage from './pages/MenPage';

function App() {
  return (
    <div className="font-mont font-light">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<WelcomePage />}/>
          <Route path='/hair' element={<HairPage />}/>
          <Route path='/men' element={<MenPage />}/>
          <Route />
        </Routes>  
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;

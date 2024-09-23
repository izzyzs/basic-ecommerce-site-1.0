import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import HeaderComponent from './components/every_page_components/HeaderComponent';
import FooterComponent from './components/every_page_components/FooterComponent';
import WelcomePage from './pages/WelcomePage';
import HairPage from './pages/HairPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import ProductPage from './pages/ProductPage';
import AuthForm from './pages/AuthForm';
import ShoppingCart from './pages/ShoppingCart';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="font-mont font-light">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<WelcomePage />}/>
          <Route path='/hair' element={<HairPage />}/>
          <Route path='/men' element={<MenPage />}/>
          <Route path='/women' element={<WomenPage />}/>
          <Route path='/sign-in' element={<AuthForm />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path="/products">
            <Route path=":productId" element={<ProductPage />}/>
          </Route>
        </Routes>  
        <FooterComponent />
      </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;

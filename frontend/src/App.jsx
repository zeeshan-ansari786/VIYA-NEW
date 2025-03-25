import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

const App = () => {
  const location = useLocation(); // Current route path check karne ke liye

  // Agar current page "/login" hai to Navbar, Footer & Padding remove karna hai
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`${isLoginPage ? '' : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'}`}>
      <ToastContainer />
      
      {/* Navbar & SearchBar sirf tab dikhayenge jab login page nahi hoga */}
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <SearchBar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>

      {/* Footer bhi sirf tab dikhayenge jab login page nahi hoga */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default App;

import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutUs from './components/pages/AboutUs';
import Footer from './components/Footer';
import { useAuth } from './AuthContext';

// Page Imports
import Home from './components/pages/Home';
import OrderPage from './components/pages/OrderPage';
import ReviewPage from './components/pages/ReviewPage';
import AuthComponent from './components/AuthComponent';
import ProfilePage from './components/pages/ProfilePage';


function App() {

  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
      <NavBar user={user}/>
      <main>
        <Routes>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/order" element={<OrderPage />} />

          {/* TO BE PROTECTED - USER MUST NOT BE LOGGED IN */}
          <Route path="/sign-up" element={<AuthComponent />} />

          {/* TO BE PROTECTED - USER MUST BE LOGGED IN*/}
          <Route path="/profile" element={<ProfilePage/>} />    
          <Route path="/review" element={<ReviewPage />} />
          
          {/* TO DO - ADD LOG IN AND SIGN UP ROUTES! */}
        </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;

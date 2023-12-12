import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components for different pages
import Login from './components/Login';
import Signup from './components/Signup'
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Explore from './components/Explore';
import Donate from './components/Donate';
import Returnables from './components/Returnables';
import Profile from './components/Profile';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const load = () => () => {
    {console.log('3',loggedIn)}
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3005/api/auth/verify', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Invalid token');
          }
        })
        .then((userData) => {
          setLoggedIn(true);
          setIsAdmin(userData.role === 'admin');
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          setLoggedIn(false);
          setIsAdmin(false);
          localStorage.removeItem('token');
        });
    }
  }
  useEffect(load, []);

  const handleSigning = (val, token='')=>{
    setLoggedIn(val);
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? (
          isAdmin ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/user" />
          )
        ) : (
          <Login
          handleSigning = {handleSigning}
            setIsAdmin={setIsAdmin} />
        )} />
        <Route path="/admin" element={loggedIn && isAdmin ? (
          <AdminDashboard />
        ) : (
          <Navigate to="/" />
        )} />
        <Route path="/user/" element={<UserDashboard handleSigning={handleSigning} loggedIn={loggedIn} isAdmin={isAdmin}/>} >
            <Route index element={<Explore />} />
            <Route path="explore" element={<Explore loggedIn={loggedIn} isAdmin={isAdmin}/>} />
            <Route path="donate" element={<Donate loggedIn={loggedIn} isAdmin={isAdmin}/>} />
            <Route path="returnables" element={<Returnables loggedIn={loggedIn} isAdmin={isAdmin}/>} />
            <Route path="profile" element={<Profile loggedIn={loggedIn} isAdmin={isAdmin}/>} />
        </Route>
        <Route path="/signup" element={loggedIn ? (
          isAdmin ? <AdminDashboard /> : <UserDashboard />
        ) : (
          <Signup
          handleSigning={handleSigning} setIsAdmin={setIsAdmin} />
        )} />
      </Routes>
    </Router>
  );

};

export default App;

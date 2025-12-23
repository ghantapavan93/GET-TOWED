import React from 'react';
import NavBar from './assets/Navbar';
import Search from './assets/Search';
import Home from './assets/Home';
import Query from './assets/Query';
import LogIn from './assets/LogIn';
import SignUp from './assets/SignUp';
import TowingCompany from './assets/TowingCompany';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router> {/* Wrap the entire application with the Router component */}
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/query" element={<Query />} />
          <Route path="/towingcompany" element={<TowingCompany />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

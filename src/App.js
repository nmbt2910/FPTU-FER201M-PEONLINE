import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Detail from './Detail';
import Dashboard from './Dashboard';
import AddForm from './AddForm';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addform" element={<AddForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
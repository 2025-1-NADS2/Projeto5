import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Overview from './pages/Overview';
import Crud from './pages/Crud';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import { useAuth } from './context/AuthContext';
import NavigationLayout from './components/NavigationLayout'; 
import Footer from './components/Footer'; 

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isAuthenticated ? <NavigationLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="overview" element={<Overview />} />
          <Route path="events" element={<Crud />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

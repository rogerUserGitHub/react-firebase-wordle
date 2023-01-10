import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContextProvider } from './Context/AuthContext';
import Homepage from './Views/Homepage';
import Profile from './Views/Profile';
import Login from './Views/Login';
import SignUp from './Views/SignUp';
import Dashboard from './Views/Dashboard';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/homepage'
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

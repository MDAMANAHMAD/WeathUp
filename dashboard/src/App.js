import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'; 
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import { GeneralContextProvider } from './components/GeneralContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <GeneralContextProvider>
                    <Routes>
                        {/* Public Auth Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} /> 

                        {/* Main Dashboard - Protected */}
                        <Route 
                            path="/*" 
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </GeneralContextProvider>
            </AuthProvider>
        </Router>
    );
}


export default App;

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import RegistrationForm from './components/RegistrationForm';
import ForgotPassword from './components/ForgotPassword';
import HomeScreen from './components/HomeScreen';
import PeriodRegistration from './components/PeriodRegistration';
import SymptomCheck from './components/SymptomCheck';
import TreatmentMethods from './components/TreatmentMethods';
import PeriodCalendar from './components/PeriodCalendar';
import HealthHistory from './components/HealthHistory';
import SettingsScreen from './components/SettingsScreen';
import NavigationFooter from './components/NavigationFooter';
import { AppProvider } from './context/AppContext';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" /> : <LoginScreen onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/register" 
            element={<RegistrationForm />} 
          />
          <Route 
            path="/forgot-password" 
            element={<ForgotPassword />} 
          />
          <Route 
            path="/home" 
            element={isAuthenticated ? <HomeScreen /> : <Navigate to="/" />} 
          />
          <Route 
            path="/period-registration" 
            element={isAuthenticated ? <PeriodRegistration /> : <Navigate to="/" />} 
          />
          <Route 
            path="/symptom-check" 
            element={isAuthenticated ? <SymptomCheck /> : <Navigate to="/" />} 
          />
          <Route 
            path="/treatment-methods" 
            element={isAuthenticated ? <TreatmentMethods /> : <Navigate to="/" />} 
          />
          <Route 
            path="/calendar" 
            element={isAuthenticated ? <PeriodCalendar /> : <Navigate to="/" />} 
          />
          <Route 
            path="/history" 
            element={isAuthenticated ? <HealthHistory /> : <Navigate to="/" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? <SettingsScreen /> : <Navigate to="/" />} 
          />
        </Routes>
        <NavigationFooter />
      </div>
    </AppProvider>
  );
}

export default App
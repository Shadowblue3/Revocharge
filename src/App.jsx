import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RevoCharge from './components/RevoCharge';
import LoginPage from './components/LoginPage';
import RevoChargeSignup from './components/RevoChargeSignup';
import RevoChargeHome from './components/RevoChargeHome';
import RevoChargePlans from './components/RevoChargePlans';
import DataSharingPage from './components/DataSharingPage';
import PurchasePage from './components/PurchasePage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Router>

        {/* Landing page */}
        <Routes>
          <Route path="/" element={<RevoCharge />} />
        

        {/* Login page */}
        
          <Route path="/login" element={<LoginPage />} />
        

        {/* Sign up */}
        
          <Route path="/signup" element={<RevoChargeSignup />} />
        

        {/* home */}
        
          <Route path="/:email/home" element={
            <ProtectedRoute>
              <RevoChargeHome />
            </ProtectedRoute>
            } />
        
        {/* Dashboard */}
        
          <Route path="/:email/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            } />
        

        {/* Plans */}
        
          <Route path="/:email/plans" element={
            <ProtectedRoute>
              <RevoChargePlans />
            </ProtectedRoute>
            } />
       

        {/* plan-purchase */}
                 
          <Route path="/:email/plans/:planName" element={
            <ProtectedRoute>
              < PurchasePage/>
            </ProtectedRoute>
            } />
        

        {/* Data-Sharing */}
        
          <Route path="/:email/data_sharing" element={
            <ProtectedRoute>
              < DataSharingPage/>
            </ProtectedRoute>
            } />
            
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import NGODashboard from './pages/NGO/NGODashboard'
import DonationRequests from './pages/NGO/DonationRequests'
import CelebrationRequests from './pages/NGO/CelebrationRequests'
import ScheduledPickups from './pages/NGO/ScheduledPickups'
import DonationHistory from './pages/NGO/DonationHistory'
import ProfileSettings from './pages/NGO/ProfileSettings'
import AdminDashboard from './pages/Admin/AdminDashboard'
import UserDashboard from "./pages/UserDashboard";
import NGLoginPage from "./pages/NGLoginPage";
import RegisterPage from "./pages/RegisterPage";
import Contact from "./pages/Donor/Contact";
import CelebrationsPage from "./pages/Donor/CelebrationsPage";
import NGODetailsPage from "./pages/Donor/NGODetailsPage";
import DonatePage from "./pages/Donor/DonatePage";
import NGODonateDetailsPage from "./pages/Donor/NGODonateDetailsPage";
import PickupSchedulePage from "./pages/Donor/PickupSchedulePage";

import ManageDonations from "./pages/Admin/ManageDonations";
import ManageNGOs from "./pages/Admin/ManageNGOs";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from './pages/Admin/Reports'
import UserAbout from './pages/Donor/UserAbout'
import UserHowItWorks from './pages/Donor/UserHowItWorks'

import './App.css';
import UserHome from './pages/Donor/UserHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard/>} />
        
        <Route path="ngo/dashboard" element={<NGODashboard/>} />
        <Route path="ngo/donations" element={<DonationRequests/>} />
        <Route path="ngo/celebrations" element={<CelebrationRequests/>} />
        <Route path="ngo/pickups" element={<ScheduledPickups/>} />
        <Route path="ngo/history" element={<DonationHistory/>} />
        <Route path="ngo/profile" element={<ProfileSettings/>} />

        <Route path="admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/" element={<UserDashboard />} />
              <Route path="/login" element={<NGLoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<UserHome />} />
              <Route path="/about" element={<UserAbout />} />

              <Route path="/how-it-works" element={<UserHowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/celebrations" element={<CelebrationsPage />} />
              
              <Route path="/celebrations/:id" element={<NGODetailsPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/donate/:id" element={<NGODonateDetailsPage />} />
              <Route path="/pickup-schedule" element={<PickupSchedulePage />} /> 

              <Route path="admin/dashboard" element={<AdminDashboard />} /> 
              <Route path="admin/donations" element={<ManageDonations />} />    
              <Route path="admin/ngos" element={<ManageNGOs />} /> 
              <Route path="admin/users" element={<ManageUsers />} /> 
              <Route path="admin/settings" element={<Reports />} /> 


      </Routes>

    </BrowserRouter>
  )
}

export default App

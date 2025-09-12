import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import Layout from './components/common/Layout';

// Import pages
import Dashboard from './pages/Dashboard';
import MedicineList from './pages/MedicineList';
import AddMedicine from './pages/AddMedicine';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <NavigationBar />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/medicines" element={<MedicineList />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;

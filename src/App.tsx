
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Medicines from './pages/Medicines';
import Home from './pages/Home';
import MedicineDetail from './pages/MedicineDetail';
import PrivateRoute from './api/PrivateRoute';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medicines" element={
          <PrivateRoute>
            <Medicines />
          </PrivateRoute>
        } />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/medicines/:id" element={
          <PrivateRoute>
            <MedicineDetail />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;

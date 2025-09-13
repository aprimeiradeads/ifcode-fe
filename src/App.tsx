import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Medicines from './pages/Medicines';
import Home from './pages/Home';
import MedicineDetail from './pages/MedicineDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/home" element={<Home />} />
        <Route path="/medicines/:id" element={<MedicineDetail />} />
      </Routes>
    </>
  );
}

export default App;

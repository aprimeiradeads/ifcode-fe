
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Medicines from './pages/Medicines';
import Alerts from './pages/Alerts';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </>
  );
}

export default App;

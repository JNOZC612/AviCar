import { Default } from './pages/Default';
import { Home } from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardRecep from './pages/DashboardRecep';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path='/dashboard/recep' element={<DashboardRecep />} />  
        <Route path='/dashboard/admin' element={<DashboardAdmin />} />
        <Route path='/not-fount' element={<Default />} />
        <Route path="*" element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

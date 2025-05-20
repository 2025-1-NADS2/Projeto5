import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Crud from './Crud';
import Overview from './Overview';
import AddEvent from './AddEvent';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <Link to="/dashboard/overview">Visão Geral</Link>
        <Link to="/dashboard/crud">Eventos</Link>
        <Link to="/dashboard/add-event">Adicionar Eventos</Link>
      </nav>
      <button onClick={handleLogout}>Sair</button>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="crud" element={<Crud />} />
        <Route path="add-event" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default Dashboard;

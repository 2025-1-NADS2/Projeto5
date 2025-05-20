import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        senha: password,
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      login();
      navigate('/overview');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Credenciais inválidas. Por favor, verifique seu email e senha.');
      } else {
        alert('Erro no servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div>
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          <span style={logoMainStyle}>Instituto Criativo</span>
          <span style={logoBadgeStyle}>Colaboradores</span>
        </div>
      </header>
      <div className="login-bg">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <Link to="/register">
            <button type="button" className="login-register-btn">Cadastrar-se</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

const headerStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: 'rgb(250, 36, 72)',
  color: '#fff',
  zIndex: 1000,
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
};

const logoContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.2rem',
};

const logoMainStyle = {
  fontFamily: "'Kanit', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: '1.68rem',
  color: '#fff',
  lineHeight: 1,
  letterSpacing: '0.01em',
};

const logoBadgeStyle = {
  fontFamily: "'Kanit', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: '1.05rem',
  background: '#fff',
  color: 'rgb(250, 36, 72)',
  borderRadius: '2rem',
  padding: '0.2em 1.2em',
  marginLeft: '0.2em',
  display: 'inline-block',
  lineHeight: 1.1,
};

export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    cidade: '',
    estado: '',
    senha: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Usuário já existe. Verifique seu email ou CPF.');
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
          <h1 className="login-title">Cadastro</h1>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

// Estilos inline para o header e logo, igual ao header principal/login
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

export default Register;

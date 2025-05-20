import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationLayout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <span style={styles.logoMain}>Instituto Criativo</span>
          <span style={styles.logoBadge}>Colaboradores</span>
        </div>
        <nav style={styles.nav}>
          <Link to="/overview" style={styles.navLink}>Visão Geral</Link>
          <Link to="/events" style={styles.navLink}>Eventos</Link>
          <Link to="/add-event" style={styles.navLink}>Adicionar Eventos</Link>
        </nav>
        <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </header>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'rgb(250, 36, 72)',
    color: '#fff',
    zIndex: 1000,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifySelf: 'start',
    gap: '1.2rem',
  },
  logoMain: {
    fontFamily: "'Kanit', system-ui, sans-serif",
    fontWeight: 700,
    fontSize: '1.68rem', 
    color: '#fff',
    lineHeight: 1,
    letterSpacing: '0.01em',
  },
  logoBadge: {
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
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  logoutButton: {
    backgroundColor: 'rgb(250, 36, 72)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 4.5rem',
    cursor: 'pointer',
    marginLeft: 'auto',
    justifySelf: 'end',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textDecoration: 'none',
  },
  main: {
    marginTop: '80px',
    padding: '1rem',
  },
};

export default NavigationLayout;

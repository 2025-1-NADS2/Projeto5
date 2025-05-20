function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>Copyright © 2025 Instituto Criativo</p>
    </footer>
  );
}

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgb(250, 36, 72)', 
    color: '#fff', 
    textAlign: 'center',
    padding: '1rem 0',
  },
  text: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default Footer;

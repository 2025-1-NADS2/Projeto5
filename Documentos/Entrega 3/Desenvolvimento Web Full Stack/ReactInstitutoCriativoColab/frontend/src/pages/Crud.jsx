import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Crud.css';

function Crud() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      alert('Erro ao buscar eventos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      alert('Evento excluído com sucesso!');
      fetchEvents();
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      alert('Erro ao excluir evento. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getSortedEvents = () => {
    const sorted = [...events];
    if (sortBy === 'date') {
      sorted.sort((a, b) => {
        if (a.data < b.data) return -1;
        if (a.data > b.data) return 1;
        return 0;
      });
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => {
        return a.nome_evento.localeCompare(b.nome_evento, 'pt-BR', { sensitivity: 'base' });
      });
    }
    return sorted;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5);
  };

  return (
    <div className="event-container">
      <div className="event-background">
        <h1>Eventos</h1>
        <div className="event-header">
          <div className="event-filters">
            <select
              className="event-sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="date">Ordenar por Data</option>
              <option value="name">Ordenar por Nome</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p>Carregando eventos...</p>
        ) : getSortedEvents().length > 0 ? (
          <div className="event-grid">
            {getSortedEvents().map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-title">
                  <h3>{event.nome_evento}</h3>
                </div>
                {event.imagem && (
                  <img
                    src={`http://localhost:3000/uploads/${event.imagem}`}
                    alt={event.nome_evento}
                    style={{
                      display: 'block',
                      maxWidth: '220px',
                      maxHeight: '180px',
                      margin: '0 auto 1rem auto',
                      borderRadius: '8px',
                      border: '2px solid rgb(250, 36, 72)',
                      objectFit: 'cover',
                      background: '#fff'
                    }}
                  />
                )}
                <p><strong>#</strong>{event.id}</p>
                <p>
                  <strong>Data:</strong> {formatDate(event.data)}
                </p>
                {event.hora && (
                  <p>
                    <strong>Horário:</strong> {formatTime(event.hora)}
                  </p>
                )}
                <p><strong>Empresa:</strong> {event.empresa}</p>
                <p><strong>Organizador(es):</strong> {event.organizadores}</p>
                <p><strong>Local:</strong> {event.local}</p>
                <div className="event-actions">
                  <Link to={`/edit-event/${event.id}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDelete(event.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Crud;

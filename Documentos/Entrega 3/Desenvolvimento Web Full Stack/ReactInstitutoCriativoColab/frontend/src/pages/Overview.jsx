import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Overview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setEvents(response.data);
      } catch (err) {
        alert('Erro ao buscar eventos');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const totalEventos = events.length;
  const totalParticipantes = events.reduce((sum, ev) => sum + (Number(ev.participantes) || 0), 0);
  const totalDoacoes = events.reduce((sum, ev) => sum + (Number(ev.quantidade_doacoes) || 0), 0);
  const valorTotalDoacoes = events.reduce((sum, ev) => sum + (Number(ev.valor_arrecadado) || 0), 0);

  const faixa18a25 = events.reduce((sum, ev) => sum + (Number(ev.idade_18a25) || 0), 0);
  const faixa26a49 = events.reduce((sum, ev) => sum + (Number(ev.idade_26a49) || 0), 0);
  const faixa50mais = events.reduce((sum, ev) => sum + (Number(ev.idade_50mais) || 0), 0);
  const totalFaixa = faixa18a25 + faixa26a49 + faixa50mais;

  const hoje = new Date();
  const eventosFuturos = events
    .filter(ev => ev.data && new Date(ev.data) >= hoje)
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 4);

  const proximoEvento = eventosFuturos[0];

  const doacoesPorMes = {};
  events.forEach(ev => {
    if (ev.data && ev.valor_arrecadado) {
      const [year, month] = ev.data.split('-');
      const key = `${year}-${month}`;
      doacoesPorMes[key] = (doacoesPorMes[key] || 0) + Number(ev.valor_arrecadado);
    }
  });
  const mesesOrdenados = Object.keys(doacoesPorMes).sort().slice(-5);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getMonthName = (key) => {
    const [year, month] = key.split('-');
    return ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][Number(month) - 1];
  };

  const pieData = {
    labels: ['18-25', '26-49', '50+'],
    datasets: [
      {
        data: [faixa18a25, faixa26a49, faixa50mais],
        backgroundColor: ['#00e6ef', '#ffe600', '#fa2448'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: mesesOrdenados.map(getMonthName),
    datasets: [
      {
        label: 'Valor Arrecadado (R$)',
        data: mesesOrdenados.map(key => doacoesPorMes[key]),
        backgroundColor: '#fa2448',
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={{ background: '#ddd', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontFamily: "'Kanit', system-ui, sans-serif", fontWeight: 700 }}>Visão Geral</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '2rem 2.5rem', minWidth: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Kanit', system-ui, sans-serif", fontWeight: 700, fontSize: '1.7rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div>{totalEventos}</div>
              <div style={{ fontWeight: 400, fontSize: '1rem' }}>Total de Eventos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div>{totalParticipantes}</div>
              <div style={{ fontWeight: 400, fontSize: '1rem' }}>Total de Participantes</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontFamily: "'Kanit', system-ui, sans-serif", fontWeight: 700, fontSize: '1.7rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div>{totalDoacoes}</div>
              <div style={{ fontWeight: 400, fontSize: '1rem' }}>Doações</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div>R$ {valorTotalDoacoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div style={{ fontWeight: 400, fontSize: '1rem' }}>Valor Total de Doações</div>
            </div>
          </div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '1.5rem 2rem',
          minWidth: 350,
          flex: 1,
          fontFamily: "'Kanit', system-ui, sans-serif",
        }}>
          <div style={{
            fontWeight: 700,
            marginBottom: '1rem',
            fontSize: '1.3rem',
            fontFamily: "'Kanit', system-ui, sans-serif"
          }}>
            Eventos Futuros
          </div>
          {eventosFuturos.map(ev => (
            <div
              key={ev.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                padding: '0.3rem 0',
                fontWeight: 400,
                fontSize: '1.1rem',
                fontFamily: "'Kanit', system-ui, sans-serif"
              }}
            >
              <span>{ev.nome_evento}</span>
              <span>{formatDate(ev.data)}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '2rem', minWidth: 350, flex: 1
        }}>
          <div style={{ fontWeight: 700, fontFamily: "'Kanit', system-ui, sans-serif", marginBottom: '1rem' }}>Faixa Etária dos Participantes</div>
          <Pie data={pieData} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: "'Kanit', system-ui, sans-serif", marginTop: '1rem' }}>
            <div><span style={{ color: '#00e6ef', fontWeight: 700 }}>●</span> 18 - 25 <span style={{ marginLeft: 8 }}>{totalFaixa ? Math.round((faixa18a25 / totalFaixa) * 100) : 0}%</span></div>
            <div><span style={{ color: '#ffe600', fontWeight: 700 }}>●</span> 26 - 49 <span style={{ marginLeft: 8 }}>{totalFaixa ? Math.round((faixa26a49 / totalFaixa) * 100) : 0}%</span></div>
            <div><span style={{ color: '#fa2448', fontWeight: 700 }}>●</span> 50+ <span style={{ marginLeft: 8 }}>{totalFaixa ? Math.round((faixa50mais / totalFaixa) * 100) : 0}%</span></div>
          </div>
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '2rem',
            minWidth: 350,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div style={{
            fontWeight: 700,
            fontFamily: "'Kanit', system-ui, sans-serif",
            marginBottom: '1rem',
            fontSize: '1.3rem',
            width: '100%',
            textAlign: 'center'
          }}>
            Próximo Evento: {proximoEvento ? proximoEvento.nome_evento : 'Nenhum'}
          </div>
          {proximoEvento && (
            <div style={{
              fontFamily: "'Kanit', system-ui, sans-serif",
              fontWeight: 400,
              width: '100%',
              textAlign: 'center',
              fontSize: '1.1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
              <div><b>Descrição:</b> {proximoEvento.descricao}</div>
              <div><b>Data:</b> {formatDate(proximoEvento.data)}</div>
              <div><b>Local:</b> {proximoEvento.local}</div>
              <div><b>Organizador(es):</b> {proximoEvento.organizadores}</div>
              <div><b>Participantes Confirmados:</b> {proximoEvento.participantes || 0}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '2rem', minWidth: 350, maxWidth: 900, margin: '0 auto'
      }}>
        <div style={{ fontWeight: 700, fontFamily: "'Kanit', system-ui, sans-serif", marginBottom: '1rem' }}>Histórico de Doações</div>
        <Bar data={barData} options={barOptions} height={120} />
      </div>
    </div>
  );
}

export default Overview;

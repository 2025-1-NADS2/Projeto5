import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_evento: '',
    segmento: '',
    descricao: '',
    local: '',
    data: '',
    hora: '',
    empresa: '',
    organizadores: '',
    quantidade_maxima: '',
    imagem: '',
    participantes: '',
    idade_18a25: '',
    idade_26a49: '',
    idade_50mais: '',
    quantidade_doacoes: '',
    valor_arrecadado: '',
  });
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setFormData({
          ...response.data,
          participantes: response.data.participantes ?? '',
          idade_18a25: response.data.idade_18a25 ?? '',
          idade_26a49: response.data.idade_26a49 ?? '',
          idade_50mais: response.data.idade_50mais ?? '',
          quantidade_doacoes: response.data.quantidade_doacoes ?? '',
          valor_arrecadado: response.data.valor_arrecadado ?? '',
        });
        if (response.data.imagem) {
          setImagemPreview(`http://localhost:3000/uploads/${response.data.imagem}`);
        }
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
        alert('Erro ao carregar evento. Tente novamente.');
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagemPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagemPreview(formData.imagem ? `http://localhost:3000/uploads/${formData.imagem}` : null);
    }
  };

  const handleChooseFile = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'imagem') dataToSend.append(key, value);
      });
      if (imagem) {
        dataToSend.append('imagem', imagem);
      }
      await axios.put(`http://localhost:3000/api/events/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Evento atualizado com sucesso!');
      navigate('/events');
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      alert('Erro ao atualizar evento. Tente novamente.');
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const [day, month, year] = dateStr.split('/');
    if (year && month && day) return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return dateStr;
  };

  return (
    <form className="edit-event-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Editar Evento</h1>
      <input
        type="text"
        name="nome_evento"
        placeholder="Nome do Evento"
        value={formData.nome_evento}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="segmento"
        placeholder="Segmento"
        value={formData.segmento}
        onChange={handleChange}
        required
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="local"
        placeholder="Local"
        value={formData.local}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="data"
        value={formatDateForInput(formData.data)}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="hora"
        value={formData.hora}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={formData.empresa}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="organizadores"
        placeholder="Organizadores"
        value={formData.organizadores}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantidade_maxima"
        placeholder="Quantidade Máxima"
        value={formData.quantidade_maxima}
        onChange={handleChange}
        required
      />

      {/* Novos campos opcionais */}
      <input
        type="number"
        name="participantes"
        placeholder="Participantes"
        value={formData.participantes}
        onChange={handleChange}
        min="0"
      />
      <input
        type="number"
        name="idade_18a25"
        placeholder="Idade 18 a 25"
        value={formData.idade_18a25}
        onChange={handleChange}
        min="0"
      />
      <input
        type="number"
        name="idade_26a49"
        placeholder="Idade 26 a 49"
        value={formData.idade_26a49}
        onChange={handleChange}
        min="0"
      />
      <input
        type="number"
        name="idade_50mais"
        placeholder="Idade 50+"
        value={formData.idade_50mais}
        onChange={handleChange}
        min="0"
      />
      <input
        type="number"
        name="quantidade_doacoes"
        placeholder="Quantidade de Doações"
        value={formData.quantidade_doacoes}
        onChange={handleChange}
        min="0"
      />
      <input
        type="number"
        name="valor_arrecadado"
        placeholder="Valor Arrecadado (R$)"
        value={formData.valor_arrecadado}
        onChange={handleChange}
        min="0"
        step="0.01"
      />

      {/* Botão estilizado para escolher arquivo */}
      <input
        type="file"
        name="imagem"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        className="choose-file-btn"
        onClick={handleChooseFile}
        style={{
          backgroundColor: 'rgb(250, 36, 72)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.7rem 1rem',
          fontSize: '1rem',
          fontFamily: "'Kanit', system-ui, sans-serif",
          fontWeight: 'bold',
          marginBottom: '0.7rem',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {imagem ? 'Imagem selecionada' : 'Escolher imagem'}
      </button>
      {/* Preview da imagem */}
      {imagemPreview && (
        <img
          src={imagemPreview}
          alt="Pré-visualização"
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

      <button type="submit">Salvar Alterações</button>
      <button type="button" onClick={() => navigate('/events')}>
        Cancelar
      </button>
    </form>
  );
}

export default EditEvent;

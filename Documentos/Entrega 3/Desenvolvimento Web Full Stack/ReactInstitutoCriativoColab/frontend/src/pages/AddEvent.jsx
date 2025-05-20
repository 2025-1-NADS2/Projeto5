import { useState, useRef } from 'react';
import axios from 'axios';

function AddEvent({ onEventAdded }) {
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
  });
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const fileInputRef = useRef(null);

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
      setImagemPreview(null);
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
        dataToSend.append(key, value);
      });
      if (imagem) {
        dataToSend.append('imagem', imagem);
      }

      const response = await axios.post('http://localhost:3000/api/events', dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && (response.status === 200 || response.status === 201)) {
        setFormData({
          nome_evento: '',
          segmento: '',
          descricao: '',
          local: '',
          data: '',
          hora: '',
          empresa: '',
          organizadores: '',
          quantidade_maxima: '',
        });
        setImagem(null);
        setImagemPreview(null);
        alert('Evento adicionado com sucesso!');
        onEventAdded();
      } else {
        throw new Error('Erro inesperado ao adicionar evento.');
      }
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      alert('Erro ao adicionar evento. Tente novamente.');
    }
  };

  return (
    <form className="edit-event-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 style={{ fontFamily: 'Kanit, sans-serif' }}>Adicionar Evento</h1>
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
        value={formData.data}
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

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AddEvent;

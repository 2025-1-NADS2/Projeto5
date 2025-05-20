// controllers/event.controller.js
const Event = require('../models/Event');

const converterData = (dataStr) => {
  if (dataStr.includes('/')) {
    const partes = dataStr.split('/');
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }
  }
  return dataStr;
};

exports.createEvent = async (req, res) => {
  let {
    nome_evento,
    segmento,
    descricao,
    local,
    data,
    hora,
    empresa,
    organizadores,
    quantidade_maxima,
    participantes,
    idade_18a25,
    idade_26a49,
    idade_50mais,
    quantidade_doacoes,
    valor_arrecadado,
  } = req.body;

  data = converterData(data);
  const imagem = req.file ? req.file.filename : null;

  if (!nome_evento || !segmento || !descricao || !local || !data || !hora || !empresa || !organizadores || !quantidade_maxima) {
    return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const newEvent = await Event.create({
      nome_evento,
      segmento,
      descricao,
      local,
      data,
      hora,
      empresa,
      organizadores,
      quantidade_maxima,
      imagem,
      participantes: participantes || null,
      idade_18a25: idade_18a25 || null,
      idade_26a49: idade_26a49 || null,
      idade_50mais: idade_50mais || null,
      quantidade_doacoes: quantidade_doacoes || null,
      valor_arrecadado: valor_arrecadado || null,
    });
    return res.status(201).json({ message: "Evento criado com sucesso!", id: newEvent.id });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return res.status(500).json({ error });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.json(events);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    return res.json(event);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  let {
    nome_evento,
    segmento,
    descricao,
    local,
    data,
    hora,
    empresa,
    organizadores,
    quantidade_maxima,
    participantes,
    idade_18a25,
    idade_26a49,
    idade_50mais,
    quantidade_doacoes,
    valor_arrecadado,
  } = req.body;

  data = converterData(data);
  const imagem = req.file ? req.file.filename : null;

  const updatedData = {
    nome_evento,
    segmento,
    descricao,
    local,
    data,
    hora,
    empresa,
    organizadores,
    quantidade_maxima,
    participantes: participantes || null,
    idade_18a25: idade_18a25 || null,
    idade_26a49: idade_26a49 || null,
    idade_50mais: idade_50mais || null,
    quantidade_doacoes: quantidade_doacoes || null,
    valor_arrecadado: valor_arrecadado || null,
  };

  if (imagem) {
    updatedData.imagem = imagem;
  }

  try {
    const [updatedRows] = await Event.update(updatedData, { where: { id } });
    if (!updatedRows) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    return res.json({ message: "Evento atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Event.destroy({ where: { id } });
    if (!deletedRows) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    return res.json({ message: "Evento excluído com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

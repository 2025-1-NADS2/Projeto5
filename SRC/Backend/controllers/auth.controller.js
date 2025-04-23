const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { nome, email, cpf, cidade, estado, senha } = req.body;

    if (!nome || !email || !cpf || !cidade || !estado || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: "Usuário já existe." });
    }

    const cpfExists = await User.findOne({ where: { cpf } });
    if (cpfExists) {
      return res.status(409).json({ message: "Usuário já existe." });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const newUser = await User.create({
      nome,
      email,
      cpf,
      cidade,
      estado,
      senha: hashedSenha
    });

    return res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
  } catch (err) {
    console.error("Erro no registro:", err);
    return res.status(500).json({ error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ error: err });
  }
};

module.exports = { register, login };

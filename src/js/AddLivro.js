import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddLivro.css';
const AddLivro = () => {
  const [livro, setLivro] = useState({
    id: '',
    livro: '',
    autor: '',
    descricao: '',
    data: '',
    imagem: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro({ ...livro, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/server");
    const data = await response.json();
    livro.id = data.length ? Math.max(data.map(l => l.id)) + 1 : 1;
    data.push(livro);
    await fetch('http://localhost:3001/server', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livro)
    });
    navigate('/');
    window.location.reload();
  };
  return (
    <div className="add-livro-container">
      <h2>Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do Livro</label>
        <input type="text" name="livro" value={livro.livro} onChange={handleChange} required />
        <label>Autor</label>
        <input type="text" name="autor" value={livro.autor} onChange={handleChange} required />
        <label>Data</label>
        <input type="date" name="data" value={livro.data} onChange={handleChange} required />
        <label>Descrição</label>
        <textarea name="descricao" value={livro.descricao} onChange={handleChange} required />
        <label>Imagem</label>
        <input type="file" name="imagem" value={livro.imagem} onChange={handleChange} required />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};
export default AddLivro;
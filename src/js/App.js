import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LivroList from './LivroList';
import LivroDetalhes from './LivroDetalhes';
import AddLivro from './AddLivro';
import '../css/App.css';
const App = () => {
  const [livros, setLivros] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/server")
      .then(response => response.json())
      .then(data => setLivros(data));
  }, []);
  const handleAddLivro = (novoLivro) => {
    setLivros([...livros, { ...novoLivro, id: livros.length + 1 }]);
  };
  const handleUpdateLivro = (updatedLivro) => {
    setLivros(livros.map((livro) => (livro.id === updatedLivro.id ? updatedLivro : livro)));
  };
  const handleDeleteLivro = (id) => {
    setLivros(livros.filter((livro) => livro.id !== id));
  };
  return (
    <Routes>
      <Route path="/" element={<LivroList livros={livros} />} />
      <Route path="/livro/:id" element={<LivroDetalhes livros={livros} onUpdate={handleUpdateLivro} onDelete={handleDeleteLivro}/>} />
      <Route path="/add-livro" element={<AddLivro onAdd={handleAddLivro} />} />
    </Routes>
  );
};
export default App;

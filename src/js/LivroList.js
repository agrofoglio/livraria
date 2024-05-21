import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LivroItem from './LivroItem';
import '../css/LivroList.css';
const LivroList = () => {
  const [livros, setLivros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/server")
      .then(response => response.json())
      .then(data => setLivros(data));
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleAddBook = () => {
    navigate('/add-livro');
  };
  const filteredLivros = livros.filter(livro =>
    livro.livro.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="page">
      <div className="top-container">
        <div className="header">
          <input
            type="text"
            placeholder="Buscar livro..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button onClick={handleAddBook} className="add-book-button">Novo</button>
        </div>
      </div>
      <div className="book-list">
        {filteredLivros.map(livro => (
          <LivroItem key={livro.id} livro={livro} />
        ))}
      </div>
    </div>
  );
};
export default LivroList;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LivroItem.css';
const LivroItem = ({ livro }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/livro/${livro.id}`);
  };
  return (
    <div className="livro-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="image-container">
        <img
          src={livro.imagem}
          alt={livro.livro}
          className="livro-imagem"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/268x180';
          }}
        />
      </div>
      <div className="text-container">
        <h2 className="livro-title">{livro.livro}</h2>
        <p className="livro-descricao">{livro.descricao}</p>
      </div>
    </div>
  );
};
export default LivroItem;

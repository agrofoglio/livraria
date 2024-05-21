import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/LivroDetalhes.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';
const LivroDetalhes = ({ livros, onUpdate, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const livroOriginal = livros.find((livro) => livro.id === parseInt(id)); 
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [livro, setLivro] = useState({ ...livroOriginal });
  const handleBackClick = () => {
    navigate('/');
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    onUpdate(livro);
    //rota para o bd atualizar livro
    //data.push(livro);
    fetch('http://localhost:3001/server', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livro)
    });

    setIsEditing(false);
  };
  const handleCancelClick = () => {
    setLivro({ ...livroOriginal });
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro({ ...livro, [name]: value });
  };
  const handleDeleteClick = () => {
    setIsDeleting(true);
  };
  const handleConfirmDelete = () => {
    onDelete(livro.id);
    fetch('http://localhost:3001/server', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livro.id)
    });
    navigate('/');
    window.location.reload();
  };
  const handleCancelDelete = () => {
    setIsDeleting(false);
  };
  if (!livro) {
    return <div>Livro não encontrado</div>;
  }
  return (
    <div className="content-container">
      <div className="header">
        <div className="back-button" onClick={handleBackClick}>
          <div className="frame">{}</div>
          <div className="text">Voltar</div>
        </div>
        <div className="action-buttons-content">
          {!isEditing ? (
            <div className="edit-button" onClick={handleEditClick}>Editar</div>
          ) : (
            <>
              <div className="save-button" onClick={handleSaveClick}>Salvar</div>
              <div className="cancel-button" onClick={handleCancelClick}>Cancelar</div>
            </>
          )}
          <div className="delete-button" onClick={handleDeleteClick}>Excluir</div>
        </div>
      </div>
      <div className="content">
        <div className="text-content">
          {!isEditing ? (
            <>
              <div className="title">{livro.livro}</div>
              <div className="subtitle-container">
                <div className="author">{livro.autor}</div>
                <div className="publish-date">{livro.data}</div>
              </div>
              <div className="description">{livro.descricao}</div>
            </>
          ) : (
            <>
              <label>Título</label>
              <input type="text" name="livro" value={livro.livro} onChange={handleChange} />
              <label>Autor</label>
              <input type="text" name="autor" value={livro.autor} onChange={handleChange} />
              <label>Data de Publicação</label>
              <input type="date" name="data" value={livro.data} onChange={handleChange} />
              <label>Descrição</label>
              <textarea name="descricao" value={livro.descricao} onChange={handleChange} />
            </>
          )}
        </div>
        <div className="image-container">
          <img src={livro.imagem} alt={livro.livro} className="image" />
        </div>
      </div>
      {isDeleting && (
        <ConfirmDeleteModal 
          onConfirm={handleConfirmDelete} 
          onCancel={handleCancelDelete} 
        />
      )}
    </div>
  );
};
export default LivroDetalhes;

import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [Livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    id: '',
    titulo: '',
    editora: '',
    autor: '',
    genero: '',
  });
 
  useEffect(() => {
    fetchLivros();
  }, []);
  
  //GET
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  //Atualização do valor dos INPUTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };  
  
  //POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/livros', novoLivro);
      fetchLivros();
      setNovoLivro({
        id: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };
  
  //DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir Livro:', error);
    }
  };
  
  //UPDATE
  const handleUpdate = async (id, LivroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livros/${id}`, LivroAtualizado);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar Livro:', error);
    }
  };

  //RENDERIZAÇÃO
  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de Livros</h1>
  
      {/* Formulário de adição de veículo */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a ISBN */}
        <input
          type="number"
          name="id"
          placeholder="ISBN"
          value={novoLivro.id}
          onChange={handleInputChange}
        />
        {/* Campo para a titulo */}
        <input
          type="text"
          name="titulo"
          placeholder="titulo"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
        {/* Campo para o editora */}
        <input
          type="text"
          name="editora"
          placeholder="editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
        {/* Campo para o autor */}
        <input
          type="text"
          name="autor"
          placeholder="autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genero"
          placeholder="genero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button>
      </form>
  
      {/* Lista de veículos */}
      <ul>
        {/* Mapeamento dos veículos */}
        {Livros.map((Livro) => (
          <li key={Livro.id}>
            {/* Exibição dos detalhes do veículo */}
            {Livro.id} - {Livro.titulo} - {Livro.editora} - {Livro.autor} - {Livro.genero}
            
            {/* Botão de exclusão */}
            <button onClick={() => handleDelete(Livro.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button
              onClick={() =>
                handleUpdate(Livro.id, {
                  ...Livro,
                  editora: 'Novo Titulo Atualizado', // Exemplo de atualização
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default App;
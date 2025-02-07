'use client'


import React, { useState } from 'react';

const SaudacaoForm = () => {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    const resposta = await fetch('http://127.0.0.1:8000/teste/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, mensagem: "Olá, FastAPI!" }), 
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      setMensagem(dados.mensagem); 
      console.log('ok') 
    } else {
      const erro = await resposta.json();
      setMensagem(`Erro: ${erro.detail}`);
      console.log('erro')
    }
  };

  return (
    <div>
      <h1>Saudação</h1>
      <form onSubmit={enviarFormulario}>
        <label htmlFor="nome">Digite seu nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default SaudacaoForm;

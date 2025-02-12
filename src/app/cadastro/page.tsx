"use client";

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { signup } from "@/services/AuthService";

const Cadastro: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter(); 

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Chamando signup com:", name, email, password);
    try {
      await signup(name, email, password);
      alert("Cadastro realizado com sucesso!");
      router.push("/inicio");
    } catch (error) {
      setError("Erro ao cadastrar. Verifique os dados.");
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Cadastro
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSignup}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Typography>
            Já tem cadastro? <Link href="/login">Fazer login</Link>
          </Typography>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Cadastrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Cadastro;

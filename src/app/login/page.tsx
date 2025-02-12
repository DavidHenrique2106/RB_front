"use client";

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/AuthService";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, senha);
      router.push("/inicio")
    } catch (error) {
      setError("Email ou senha incorretos");
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
          Login
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleLogin}>
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <Typography>
            Não tem cadastro? <Link href="/cadastro">Fazer cadastro</Link>
          </Typography>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

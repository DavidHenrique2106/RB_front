'use client'

import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Despesas() {
  const [ganhos, setGanhos] = useState<number>(0);
  const [inputValor, setInputValor] = useState<string>('');

  const handleAddGanho = () => {
    const valor = parseFloat(inputValor);
    if (!isNaN(valor)) {
      setGanhos(ganhos + valor);
      setInputValor('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <TextField
          label="Adicionar Despesa"
          variant="outlined"
          fullWidth
          value={inputValor}
          onChange={(e) => setInputValor(e.target.value)}
          sx={{ mb: 2 }}
          
        />
        <Button variant="contained" color="success" fullWidth onClick={handleAddGanho}>
          Adicionar
        </Button>
      </Box>
      
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          padding: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          borderRadius: 2 
        }}
      >
        <AttachMoneyIcon />
        <Typography variant="h6">R$ {ganhos.toFixed(2)}</Typography>
      </Paper>
    </Container>
  );
}

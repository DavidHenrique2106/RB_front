export const API_URL = "https://rb-back.onrender.com"; 

import { useRouter } from "next/navigation";

export const signup = async (nome: string, email: string, senha: string) => {
  const router = useRouter(); 

  try {
    const response = await fetch(`${API_URL}/usuarios/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar conta");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); 

    router.push("/inicio"); 
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, senha: string) => {
  const response = await fetch(`${API_URL}/usuarios/login`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);
    throw new Error("Credenciais inválidas");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};

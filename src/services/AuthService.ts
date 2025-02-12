export const API_URL = "http://127.0.0.1:8000"; 

export const signup = async (nome: string, email: string, senha: string) => {
   
  try {
    console.log("Enviando dados:", { nome, email, senha });

    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    const responseData = await response.json().catch(() => null);
    console.log("Dados da resposta:", responseData);

    if (!response.ok) {
      throw new Error("Erro ao criar conta");
    }

    localStorage.setItem("token", responseData.token);
    
    console.log("Cadastro bem-sucedido! Redirecionando...");

    return responseData;
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
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

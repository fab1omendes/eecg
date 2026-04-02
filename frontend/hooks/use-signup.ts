import { useState } from "react";
import { signIn } from "next-auth/react";

export function useSignup() {
  const [loading, setLoading] = useState(false);

  // O customData recebe as coisas que não estão nos inputs nativos, como a 'date' do calendário
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, customData?: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    // Mesclamos os dados nativos do formulário com dados de estados de componentes avançados
    const dataToSend = {
      name: formData.get("name"),
      email: email,
      password: password,
      ...customData
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      if (res.ok) {
        // Se a conta for criada, fazemos login automático
        const loginRes = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false
        });

        if (loginRes?.ok) {
          window.location.href = "/sample"; 
        } else {
          alert('Conta criada mas falha ao logar automaticamente.');
        }
      } else {
        const errors = await res.json();
        console.error("Erros do backend:", errors);
        alert('Erro ao criar conta, verifique se o e-mail já existe.');
      }
    } catch (error) {
      console.error("Erro na comunicação da API:", error);
    } finally {
      setLoading(false);
    }
  }

  // O Hook "retorna" a função e o loading para quem for usá-lo
  return {
    handleSubmit,
    loading
  };
}

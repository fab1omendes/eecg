import { useState } from "react";

export function useCardioFlux() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const API_URL = process.env.NEXT_PUBLIC_API_CARDIOFLUX || "http://localhost:8001";
    console.log("CardioFlux API URL being used:", API_URL);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Erro ao analisar o exame com CardioFlux_Mark1");
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      const message = err.message || "Ocorreu um erro inesperado";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyze,
    loading,
    error,
  };
}

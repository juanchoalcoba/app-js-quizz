import type { Question } from "../types";
import { useAuthStore } from "../hooks/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export const saveGameSession = async (sessionData: {
  questions: Question[];
  correct: number;
  incorrect: number;
  unanswered: number;
}) => {
  const token = useAuthStore.getState().token;

  console.log('🔍 Token encontrado:', token ? 'Sí' : 'No');
  console.log('📊 Datos a enviar:', sessionData);

  const response = await fetch(`${API_URL}/api/game-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(sessionData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Error en respuesta del backend:", errorText);
    throw new Error('Error guardando la sesión');
  }

  return response.json();
};

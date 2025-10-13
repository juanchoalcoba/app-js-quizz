export interface Question {
  id: number;               // ID único de la pregunta
  question: string;         // Texto de la pregunta
  code: string;             // Código asociado (puede estar vacío)
  answers: string[];        // Array de posibles respuestas
  correctAnswer: number;   // Respuesta correcta
  userSelectedAnswer?: number
  isCorrectUserAnswer?: boolean
}

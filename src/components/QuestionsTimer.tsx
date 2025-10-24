import { useEffect, useState, useRef } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

interface QuestionTimerProps {
  duration: number; // segundos totales
  onTimeUp: () => void;
  currentQuestion: number; // reinicia timer al cambiar de pregunta
  stop?: boolean; // indica si detener timer (cuando usuario respondió)
}

export const QuestionTimer = ({
  duration,
  onTimeUp,
  currentQuestion,
  stop = false,
}: QuestionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<number | null>(null); // ← Aquí usamos number para navegador

  // Reinicia timer al cambiar de pregunta o duración
  useEffect(() => {
    setTimeLeft(duration);
  }, [currentQuestion, duration]);

  // Timer principal
  useEffect(() => {
    if (stop) {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [currentQuestion, stop, onTimeUp, duration]);

  const getColor = () => {
    if (timeLeft <= duration * 0.3) return "#ff1744"; // rojo
    if (timeLeft <= duration * 0.6) return "#ff9100"; // naranja
    return "#00e676"; // verde
  };

  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" fontWeight="bold">
          Tiempo: {timeLeft}s
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / duration) * 100}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#2b2b2b",
          "& .MuiLinearProgress-bar": {
            backgroundColor: getColor(),
            transition: "width 0.3s linear",
          },
        }}
      />
    </Box>
  );
};

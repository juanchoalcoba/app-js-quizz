import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

type GameSession = {
  _id: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  createdAt: string;
};

export const PartidasPage = () => {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Debes iniciar sesión para ver tus partidas");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/api/game-session/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Error al obtener las partidas");
        }

        const data = await res.json();
        setSessions(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error inesperado");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <Typography align="center">Cargando partidas...</Typography>;
  if (error) return <Typography align="center" color="error">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Mis Partidas Guardadas
      </Typography>

      {sessions.length === 0 ? (
        <Typography align="center">No tienes partidas guardadas aún.</Typography>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2} // espacio horizontal y vertical
        >
          {sessions.map((s) => (
            <Card
              key={s._id.toString()}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                minWidth: 250,
                maxWidth: 300,
                flex: "1 1 250px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {new Date(s.createdAt).toLocaleString()}
                </Typography>
                <Typography>Preguntas totales: {s.totalQuestions}</Typography>
                <Typography color="success.main">✅ Correctas: {s.correct}</Typography>
                <Typography color="error.main">❌ Incorrectas: {s.incorrect}</Typography>
                <Typography color="text.secondary">⏳ Sin responder: {s.unanswered}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Botón centrado al final */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
        >
          Empezar una partida
        </Button>
      </Box>
    </Container>
  );
};

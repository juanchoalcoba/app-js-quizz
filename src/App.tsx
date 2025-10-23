import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JavascriptLogo } from "./JavascriptLogo";
import { Start } from "./Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";
import { VerifyEmail } from './components/VerifyEmail';
import { Navbar } from './components/Navbar'; // ✅ Importar Navbar

function App() {
  const questions = useQuestionsStore(state => state.questions);

  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Aquí se muestra siempre */}

      <main style={{ marginTop: "24px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Container maxWidth="sm">
                <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
                  <JavascriptLogo />
                  <Typography variant="h2" component="h1">
                    Javascript Quizz
                  </Typography>
                </Stack>
                {questions.length === 0 && <Start />}
                {questions.length > 0 && <Game />}
              </Container>
            }
          />

          {/* Ruta de verificación de email */}
          <Route path="/verify" element={<VerifyEmail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

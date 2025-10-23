import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JavascriptLogo } from "./JavascriptLogo";
import { Start } from "./Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";




function App() {
  const questions = useQuestionsStore(state => state.questions);
  console.log(questions)

  return (
    <main>
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
    </main>
  );
}

export default App;

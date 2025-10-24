import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import type { Question as QuestionType } from './types';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';
import { useState } from 'react';
import { QuestionTimer } from './components/QuestionsTimer';

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion);
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const questionInfo = questions[currentQuestion];
  const [stopTimer, setStopTimer] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false); // <- nuevo estado para mostrar correcta

  if (!questionInfo) return <Typography>Cargando preguntas...</Typography>;

  // Función para determinar el color de fondo de cada respuesta
  const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;

    if (userSelectedAnswer == null && showCorrect) {
      // Si terminó el tiempo y no respondió, mostrar solo la correcta
      return index === correctAnswer ? 'green' : 'transparent';
    }

    if (userSelectedAnswer == null) return 'transparent';
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    if (index === correctAnswer) return 'green';
    if (index === userSelectedAnswer) return 'red';
    return 'transparent';
  };

  // Se ejecuta si se termina el tiempo
  const handleTimeUp = () => {
    if (questionInfo.userSelectedAnswer == null) {
      setStopTimer(true);
      setShowCorrect(true); // mostrar la correcta

      setTimeout(() => {
        selectAnswer(questionInfo.id, null); // marca como sin responder
        goNextQuestion();
        setStopTimer(false);
        setShowCorrect(false); // reinicia para la siguiente pregunta
      }, 1500);
    }
  };

  // Se ejecuta cuando el usuario responde
  const handleAnswer = (answerIndex: number) => {
    if (questionInfo.userSelectedAnswer != null) return; // ya respondió
    selectAnswer(questionInfo.id, answerIndex);
    setStopTimer(true); // detiene timer

    setTimeout(() => {
      goNextQuestion();
      setStopTimer(false); // reinicia timer
    }, 1500);
  };

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        <Typography>
          {currentQuestion + 1} / {questions.length}
        </Typography>

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>

      {/* Timer arriba de la tarjeta */}
      <QuestionTimer
        duration={5}
        onTimeUp={handleTimeUp}
        currentQuestion={currentQuestion}
        stop={stopTimer}
      />

      {/* Tarjeta de pregunta */}
      <Card variant="outlined" sx={{ bgcolor: '#222', textAlign: 'left', marginTop: 4 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          {questionInfo.question}
        </Typography>

        {questionInfo.code && (
          <SyntaxHighlighter language="javascript" style={gradientDark}>
            {questionInfo.code}
          </SyntaxHighlighter>
        )}

        <List sx={{ bgcolor: '#333' }} disablePadding>
          {questionInfo.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={questionInfo.userSelectedAnswer != null || stopTimer}
                sx={{
                  backgroundColor: getBackgroundColor(questionInfo, index),
                }}
                onClick={() => handleAnswer(index)}
              >
                <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>

      <Footer />
    </>
  );
};

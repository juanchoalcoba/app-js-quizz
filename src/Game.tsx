import {Card,  List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material'
import { useQquestionsStore } from './store/questions'
import type { Question as QuestionType } from './types'
import {gradientDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import  SyntaxHighlighter from 'react-syntax-highlighter'


const Question = ({info}: {info: QuestionType}) => {
     const selectAnswer = useQquestionsStore((state) => state.selectAnswer);

     const handleClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex); // actualiza el estado global

    const isCorrect = info.correctAnswer === answerIndex;
    console.log(isCorrect ? "✅ Correcta" : "❌ Incorrecta");
    alert(isCorrect ? "✅ ¡Respuesta correcta!" : "❌ Respuesta incorrecta");
  };


    return (
        <Card variant="outlined" sx={{bgcolor: "#222",  textAlign:"left", marginTop: 4}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter languaje="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{bgcolor: "#333"}} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton onClick={() => handleClick(index)}>
                            <ListItemText primary={answer} sx={{textAlign:"center"}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQquestionsStore(state => state.questions)
    const currentQuestion = useQquestionsStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]



    return (
        <>
        <Question info={questionInfo}/>
        </>
    )
}
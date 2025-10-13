import {Button} from '@mui/material';
import { useQquestionsStore } from './store/questions';

const LIMIT_QUESTIONS = 10

export const Start = () => {
    const fetchQuestions = useQquestionsStore(state => state.fetchQquestions);


    const handleClick = () => {
        fetchQuestions(LIMIT_QUESTIONS)
    }

    return (
        <Button onClick={handleClick} variant='contained'>
            Empezar
        </Button>
    )
}
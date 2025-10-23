import { Button } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import { useAuthStore } from './hooks/useAuthStore';
import { AuthModal } from './components/AuthModal'; // Asegurate de que la ruta sea correcta

const LIMIT_QUESTIONS = 10;

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQquestions);
  const { isLoggedIn, setOpenModal } = useAuthStore();

  const handleClick = () => {
    if (!isLoggedIn) {
      // Si el usuario no está logueado, abre el modal
      setOpenModal(true);
      return;
    }

    // Si ya está logueado, empieza el juego
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <>
      <Button onClick={handleClick} variant="contained">
        Empezar
      </Button>
      {/* El modal siempre se renderiza, pero solo se muestra si openModal es true */}
      <AuthModal />
    </>
  );
};

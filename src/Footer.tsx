import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAuthStore } from "./hooks/useAuthStore";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { useQuestionsStore } from "./store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore(state => state.reset);
  const logout = useAuthStore(state => state.logout);

  // Estado para el modal de confirmación
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleExit = () => {
    // Abre el modal en lugar de ejecutar directamente
    setOpenConfirm(true);
  };

  const confirmExit = () => {
    // Si el usuario confirma
    reset();   // limpiar preguntas
    logout();  // limpiar usuario y token
    setOpenConfirm(false);
  };

  const cancelExit = () => {
    setOpenConfirm(false); // cerrar modal sin hacer nada
  };

  return (
    <>
      <footer style={{ marginTop: "16px" }}>
        <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
        <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "center" }}>
          <Button onClick={() => reset()}>Reiniciar Juego</Button>
          <Button color="error" onClick={handleExit}>Salir del Juego</Button>
        </div>
      </footer>

      {/* Modal de confirmación */}
      <Dialog open={openConfirm} onClose={cancelExit}>
        <DialogTitle>Confirmar salida</DialogTitle>
        <DialogContent>¿Estás seguro que quieres abandonar el juego?</DialogContent>
        <DialogActions>
          <Button onClick={cancelExit}>No</Button>
          <Button color="error" onClick={confirmExit}>Sí</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

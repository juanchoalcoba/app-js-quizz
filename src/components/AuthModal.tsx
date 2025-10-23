import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export const AuthModal = () => {
  const { openModal, setOpenModal, login, register } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
        alert("Revisa tu correo para verificar tu cuenta");
      }

      setOpenModal(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      // 🔹 Aquí nos aseguramos de reactivar el botón
      setLoading(false);
    }
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>{isLogin ? "Iniciar Sesión" : "Registrarse"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, width: 300 }}>
          {!isLogin && (
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          )}
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? "Procesando..." : isLogin ? "Ingresar" : "Registrarse"}
          </Button>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "¿No tienes cuenta? Registrate"
              : "¿Ya tienes cuenta? Ingresar"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const { user, isLoggedIn, logout, setOpenModal } = useAuthStore();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setOpenLogoutModal(false);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* Logo o título */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            JS Quiz
          </Typography>

          {/* Opciones a la derecha */}
          <Box display="flex" alignItems="center" gap={2}>
            {!isLoggedIn && (
              <>
                <Button color="inherit" onClick={() => setOpenModal(true)}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => setOpenModal(true)}>
                  Register
                </Button>
              </>
            )}

            {isLoggedIn && (
              <>
                <Typography variant="body1">
                  Hola, <strong>{user?.name}</strong>
                </Typography>
                <Button color="inherit" onClick={() => setOpenLogoutModal(true)}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Offset para el navbar */}
      <Toolbar />

      {/* Modal de confirmación Logout */}
      <Dialog open={openLogoutModal} onClose={() => setOpenLogoutModal(false)}>
        <DialogTitle>¿Cerrar sesión?</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas cerrar sesión?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutModal(false)}>Cancelar</Button>
          <Button color="error" onClick={handleConfirmLogout}>
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, CircularProgress, Stack } from '@mui/material';

export const VerifyEmail: React.FC = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'|'expired'>('idle');
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ URL completa del backend
  const BACKEND_URL = 'http://localhost:3000';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const id = params.get('id');

    if (!token || !id) {
      setStatus('error');
      setMessage('Faltan parámetros en la URL.');
      return;
    }

    setUserId(id);
    setStatus('loading');

    fetch(`${BACKEND_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`)
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage(data.message || 'Verificado correctamente.');
        } else {
          if (data.message && data.message.toLowerCase().includes('expir')) {
            setStatus('expired');
          } else {
            setStatus('error');
          }
          setMessage(data.message || 'Error verificando usuario');
        }
      })
      .catch(err => {
        console.error('Error verify fetch:', err);
        setStatus('error');
        setMessage('Error de red o servidor.');
      });
  }, []);

  const handleResend = async () => {
    if (!userId) {
      setMessage('No hay id de usuario para reenviar.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Email reenviado.');
      } else {
        setStatus('error');
        setMessage(data.message || 'No se pudo reenviar.');
      }
    } catch (err) {
      console.error('Resend error', err);
      setStatus('error');
      setMessage('Error reenviando email.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Verificación de Email</Typography>

        {status === 'loading' && <CircularProgress />}

        {status === 'success' && (
          <>
            <Typography color="success.main">{message}</Typography>
            <Button variant="contained" href="/">Ir al inicio</Button>
          </>
        )}

        {status === 'error' && (
          <>
            <Typography color="error.main">{message}</Typography>
            <Button variant="contained" href="/">Volver</Button>
          </>
        )}

        {status === 'expired' && (
          <>
            <Typography color="warning.main">{message || 'Token expirado.'}</Typography>
            <Typography>Puedes reenviar el email de verificación:</Typography>
            <Button variant="contained" onClick={handleResend}>Reenviar email</Button>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default VerifyEmail;

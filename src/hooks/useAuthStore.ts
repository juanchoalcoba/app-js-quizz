import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthState {
  user?: User;
  token?: string;
  isLoggedIn: boolean;
  loading: boolean;
  error?: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  setError: (error?: string) => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (token: string, id: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      isLoggedIn: false,
      loading: false,
      error: undefined,
      openModal: false,

      setOpenModal: (open: boolean) => set({ openModal: open }),
      setError: (error) => set({ error }),

      register: async (name, email, password) => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          const data: { message: string } = await res.json();

          if (!res.ok) throw new Error(data.message || 'Error en registro');

          alert(data.message); // O reemplazar con tu UI
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (token, id) => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch(`http://localhost:3000/api/auth/verify?token=${token}&id=${id}`);
          const data: { message: string } = await res.json();

          if (!res.ok) throw new Error(data.message || 'Error verificando usuario');

          alert(data.message); // O reemplazar con tu UI
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ loading: false });
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data: { user: User; token: string; message?: string } = await res.json();

          if (!res.ok) throw new Error(data.message || 'Error en login');

          set({
            user: data.user,
            token: data.token,
            isLoggedIn: true,
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          set({ error: message });
          throw new Error(message);
        } finally {
          set({ loading: false });
        }
      },

      logout: () => set({ user: undefined, token: undefined, isLoggedIn: false }),
    }),
    { name: 'auth' } // Persistencia en localStorage
  )
);

import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
const baseUrl = "http://54.242.76.106:5000/api";
// const baseUrl = process.env.REACT_APP_API_URL;


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username || !password) {
      setError('Usuario y contraseña son requeridos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/User/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      const data = await response.json(); // Parsear la respuesta a JSON
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error en la autenticación');
      }

      if (data.status === true) {
        localStorage.setItem('user', JSON.stringify({
          id: data.user.Id,
          username: data.user.Username, // Asegúrate que coincide con el nombre de propiedad
          email: data.user.Email,
          createdAt: data.user.CreatedAt
        }));

        navigate('/profile');
      } else {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

    } catch (err) {
      console.error('Error en login:', err);
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </button>

        <p style={{ marginTop: '1rem' }}>
          ¿No tienes cuenta?{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    passwordHash: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${baseUrl}/User/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al registrar usuario');
      }

      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Registrarse</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Tu correo electrónico"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="passwordHash" className={styles.label}>Contraseña</label>
          <input
            type="password"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>

        <p style={{ marginTop: '1rem' }}>
          ¿Ya tienes cuenta?{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Inicia sesión aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;

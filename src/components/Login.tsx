// Login.tsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Asegúrate de importar useAuth

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      login(); 
      navigate('/'); 
    } catch (error: any) {
      setError('Login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna entre true y false
  };

  return (
    <div className='login'>
    <h2>Bienvenido</h2>
    {error && <p className='error-message'>{error}</p>}
    <form onSubmit={handleLogin}>
      <div className='content-email'>
        <label htmlFor='email'>Correo</label>
        <input
          id='email'
          type="email"
          value={email}
          placeholder='Correo'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='content-password'>
        <label htmlFor='password'>Contraseña</label>
        <div className="password-wrapper">
          <input
            id='password'
            type={showPassword ? 'text' : 'password'} // Alterna el tipo de input
            value={password}
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🙈' : '👁️'} {/* Cambia el ícono basado en el estado */}
          </button>
        </div>
      </div>
      <button type="submit" className='submit'>Inicia sesión</button>
    </form>
  </div>
);
};

export default Login;

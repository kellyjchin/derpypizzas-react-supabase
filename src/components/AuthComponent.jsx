import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css'

function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError('');
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) setError(signUpError.message);
    else setUser(user.user);

    const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        user_id: user.id,  
        reward_points: 0,  
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (profileError) setError(profileError.message);
  };

  const handleLogin = async () => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else {
      setUser(data.user);
      navigate('/profile');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
        </div>
      ) : (
        <>
        <h2 className='no-real-email'>No REAL email address needed. You could literally sign up with a dumby email such as test2@test.ca (assuming it hasn't been taken!)</h2>
        <div className='auth-form'>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="cta" onClick={handleSignUp}>Sign Up</button>
          <button className="cta" onClick={handleLogin}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </>
      )}
    </div>
  );
}

export default AuthComponent;

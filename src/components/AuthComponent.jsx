import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

// TO DO
// - When a user logs in, redirect to profile page. Profile will also have the ability to leave a review there.

function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error.message);
    else setUser(data.user);
  };

  const handleLogin = async () => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else setUser(data.user);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}

export default AuthComponent;

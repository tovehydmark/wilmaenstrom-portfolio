import { Router, useRouter } from 'next/router';
import { useState } from 'react';

const CreateAccount = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      const body = { username: username, password: password };

      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }

    router.push('/admin/dashboard');
  };

  return (
    <>
      <form
        className="admin-login-section"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateUser();
        }}
      >
        <h1>Skapa konto</h1>
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="primary-btn" disabled={username.length < 1 || password.length < 1}>
          Skapa konto
        </button>{' '}
        <button onClick={router.back} className="secondary-btn account-btn">
          Gå tillbaka
        </button>
      </form>
    </>
  );
};

export default CreateAccount;

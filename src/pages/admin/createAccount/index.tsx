import { Router, useRouter } from 'next/router';
import { useState } from 'react';

const CreateAccount = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      const body = { username: username, password: password };
      console.log('body', body);

      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('response', response);

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
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Skapa konto</button>
      </form>
      <button onClick={router.back}>Gå tillbaka</button>
    </>
  );
};

export default CreateAccount;

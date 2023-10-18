import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);

        router.push('/admin/dashboard');
      } else {
        setErrorMessage('Användarnamn och lösen stämmer inte överens');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <form className="admin-login-section" onSubmit={handleLogin}>
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Logga in</button>
      </form>
      <Link href="/admin/createAccount">Skapa konto</Link>
    </>
  );
};

export default Login;

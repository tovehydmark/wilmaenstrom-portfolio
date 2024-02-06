import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

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

    const res = await signIn('credentials', {
      inputValue: formData.username,
      password: formData.password,
      redirect: false,
      callbackUrl: '/admin/dashboard',
    });

    if (res?.error) {
      const errorMessage = 'Användarnamnet eller lösenordet stämmer inte';
    }

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
        <h1>Logga in</h1>
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button
          type="submit"
          className="primary-btn"
          disabled={formData.username.length < 1 || formData.password.length < 1}
        >
          Logga in
        </button>{' '}
        <Link className="tetithary-btn" href={'/admin/createAccount'}>
          Skapa konto
        </Link>
      </form>
    </>
  );
};

export default Login;

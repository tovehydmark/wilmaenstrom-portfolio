import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
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
        console.log('data', data);
        localStorage.setItem('authToken', data.token);

        router.push('/admin/dashboard');
      } else {
        console.log('Login failed');
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

        <button type="submit">Logga in</button>
      </form>
      <Link href="/admin/createAccount">Skapa konto</Link>
    </>
  );
};

export default Login;

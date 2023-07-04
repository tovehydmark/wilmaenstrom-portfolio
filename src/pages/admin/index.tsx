import Link from 'next/link';
import { Router, useRouter } from 'next/router';

const Admin = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/admin/dashboard');
  };
  return (
    <>
      <form className="admin-login-section" onSubmit={handleLogin}>
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" />

        <button type="submit">Logga in</button>
      </form>
      <Link href="/admin/createAccount">Skapa konto</Link>
    </>
  );
};

export default Admin;

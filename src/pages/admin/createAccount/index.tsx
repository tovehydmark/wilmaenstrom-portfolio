import { Router, useRouter } from 'next/router';

const Admin = () => {
  const router = useRouter();

  return (
    <>
      <form className="admin-login-section">
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" />
        <button>Skapa konto</button>
      </form>
      <button onClick={router.back}>Gå tillbaka</button>
    </>
  );
};

export default Admin;

import Link from 'next/link';

const Admin = () => {
  return (
    <>
      <form className="admin-login-section">
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" />

        <button>Logga in</button>
      </form>
      <Link href="/admin/createAccount">Skapa konto</Link>
    </>
  );
};

export default Admin;

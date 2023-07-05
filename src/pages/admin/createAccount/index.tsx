import { Router, useRouter } from 'next/router';

const CreateAccount = () => {
  const router = useRouter();

  const handleCreateUser = async () => {
    try {
      const response = await fetch('/api/createUser');
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }

    router.push('/admin/dashboard');
  };

  return (
    <>
      <form className="admin-login-section" onSubmit={handleCreateUser}>
        <label htmlFor="username">Användarnamn:</label>
        <input type="text" id="username" />
        <label htmlFor="password">Lösenord:</label>
        <input type="password" id="password" />
        <button type="submit">Skapa konto</button>
      </form>
      <button onClick={router.back}>Gå tillbaka</button>
    </>
  );
};

export default CreateAccount;

import { ImageDocument } from '@/app/api/models';
import ImageUploadForm from '@/app/components/ImageUploadForm';

import Illustrations from '@/pages/illustrations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  //Todo: Enable to delete image on X

  const checkIfUserIsAuthenticated = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return false;
    }

    try {
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, []);

  return (
    <>
      <section className="admin-greeting-section">
        <h1>Välkommen, Wilma!</h1>
        <p>Här kan du ladda upp nya bilder och hantera de bilder du laddat upp innan.</p>
      </section>
      <section className="admin-upload-image-section">
        <h2>Ladda upp ny bild</h2>
        <ImageUploadForm></ImageUploadForm>
      </section>
      <section className="admin-gallery">
        <h2>Galleri</h2>
        <Illustrations></Illustrations>
      </section>
    </>
  );
};

export default Dashboard;

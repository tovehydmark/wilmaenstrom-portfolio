import { ImageDocument } from '@/app/api/models/Image';
import ImageUploadForm from '@/app/components/ImageUploadForm';
import PortfolioImage from '@/app/components/PortfolioImage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [images, setImages] = useState<ImageDocument[]>();
  const router = useRouter();

  const checkIfUserIsAuthenticated = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return false;
    }
    try {
      setUserIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  useEffect(() => {
    const isAuthenticated = checkIfUserIsAuthenticated();
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/getImages');
        const data: any = await response.json();
        setImages(data.images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {userIsAuthenticated ? (
        <div>
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
            <section className="admin-gallery-view">
              {images?.map((image) => {
                return (
                  <PortfolioImage
                    key={JSON.stringify(image._id)}
                    id={image._id}
                    fileName={image.fileName}
                    imageUrl={image.imageUrl}
                    imageDescription={image?.imageDescription}
                  ></PortfolioImage>
                );
              })}
            </section>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Dashboard;

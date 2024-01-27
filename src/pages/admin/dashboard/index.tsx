import { ImageDocument } from '@/app/api/models/Image';
import ImageUploadForm from '@/app/components/ImageUploadForm';
import PortfolioImage from '@/app/components/PortfolioImage';
import SideMenu from '@/app/components/admin/SideMenu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [images, setImages] = useState<ImageDocument[]>();
  const [uploadedNewImage, setUploadedNewImage] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

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
  }, [uploadedNewImage]);

  return (
    <>
      {userIsAuthenticated ? (
        <>
          <div className="dashboard-layout">
            <SideMenu></SideMenu>
            <section className="admin-greeting-section">
              <h1>Välkommen!</h1>
              <p>
                Här kan du ladda upp nya bilder och hantera de bilder du laddat upp innan. Bildtexten du skriver kommer
                att visas bredvid bilden i galleriet då du klickar på den på din portfolio-sida.
              </p>
            </section>
            <hr />
            <section className="admin-upload-image-section">
              <h2>Ladda upp ny bild</h2>

              <ImageUploadForm
                apiString={'postImageToAzure'}
                onSave={() => setUploadedNewImage(!uploadedNewImage)}
                isHeader={false}
              ></ImageUploadForm>
            </section>
            <hr />
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Dashboard;

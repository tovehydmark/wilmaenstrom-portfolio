import { ImageDocument } from '@/app/api/models/Image';
import ImageUploadForm from '@/app/components/ImageUploadForm';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
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

  const deleteImage = async (id: ObjectId | undefined, fileName: string) => {
    try {
      //Delete image from MongoDB
      const response = await fetch('/api/deleteImageFromMongoDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      if (response.ok) {
        console.log('Image deleted from MongoDB!');

        //Delete image from Azure
        try {
          const response = await fetch('/api/deleteImageFromAzure', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileName),
          });

          if (response.ok) {
            console.log('Image deleted from Azure!');
          } else {
            console.log('Something went wrong, image not deleted from Azure');
          }
        } catch (error) {
          console.log('Error', error);
        }
      } else {
        console.log('Error: Something went wrong, image not deleted from MongoDB.');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

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
                  <section key={JSON.stringify(image._id)} className="admin-gallery-image">
                    <button onClick={() => deleteImage(image._id, image.fileName)}>Delete</button>

                    <Image
                      src={image.imageUrl}
                      alt={image.fileName}
                      width={300}
                      height={300}
                      style={{ objectFit: 'cover' }}
                    ></Image>
                    <p>{image.imageDescription}</p>
                  </section>
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

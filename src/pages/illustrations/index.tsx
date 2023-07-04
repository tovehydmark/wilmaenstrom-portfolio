import { ImageDocument } from '@/app/api/models';
import Layout from '@/app/layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Illustrations = () => {
  const [images, setImages] = useState<ImageDocument[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/getImages');
        const data: ImageDocument[] = await response.json();

        setImages(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const postImageString = async () => {
    const body = { title: '/BIBIB', src: '/mucha-4.jpeg' };

    try {
      let response = await fetch('/api/postImage', {
        method: 'POST',
        body: JSON.stringify(body),

        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      const data: ImageDocument[] = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={postImageString}>Posta</button>
      <div className="illustration-container">
        {images.map((image) => {
          return (
            <div key={image._id} className="illustration">
              <Image src={image.src} alt={image.title} fill></Image>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Illustrations;

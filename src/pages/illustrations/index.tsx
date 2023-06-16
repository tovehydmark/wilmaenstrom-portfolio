import Layout from '@/app/layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Illustrations = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch('/api/getImages');
        let data = await response.json();

        setImages(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const postImageString = async () => {
    const body = { title: 'BIBIB', src: '12343234312dfd' };

    try {
      let response = await fetch('/api/postImage', {
        method: 'POST',
        body: JSON.stringify(body),

        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
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
            <Image
              key={image._id}
              src={image.src}
              alt={image.title}
              width={80}
              height={80}
              className="illustration"
            ></Image>
          );
        })}{' '}
      </div>
    </>
  );
};

export default Illustrations;

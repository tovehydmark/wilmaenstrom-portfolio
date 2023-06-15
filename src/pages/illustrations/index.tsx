import Layout from '@/app/layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Illustrations = () => {
  const [imagesFromDb, setImagesFromDb] = useState();

  useEffect(() => {
    getImageInfo();
  }, []);
  const images = [
    { src: '/image1', name: 'image1' },
    { src: '/image2', name: 'image2' },
    { src: '/image3', name: 'image3' },
    { src: '/image4', name: 'image4' },
    { src: '/image5', name: 'image5' },
    { src: '/image6', name: 'image6' },
    { src: '/image7', name: 'image7' },
    { src: '/image8', name: 'image8' },
  ];

  const postImageString = async () => {
    //Todo: change body to what should be uploaded
    const body = 'BIBIB';

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

  // WIP get
  // const getImageInfo = async () => {
  //   try {
  //     let response = await fetch('/api/postImage', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json, text/plain, */*',
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     // response = await response.json();

  //     console.log('response', response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <button onClick={postImageString}>Posta</button>
      <div className="illustration-container">
        {images.map((image) => {
          return (
            <Image
              key={image.src}
              src={image.src}
              alt={image.name}
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

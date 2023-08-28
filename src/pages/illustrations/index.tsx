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

  return (
    <>
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

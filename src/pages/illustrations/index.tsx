import { ImageDocument } from '@/app/api/models/Image';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Illustrations = () => {
  const [images, setImages] = useState<ImageDocument[]>();

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
      <div className="illustration-container">
        {images
          ? images.map((image, i) => {
              return (
                <div key={image._id} className="illustration">
                  <Link
                    href={{
                      pathname: '/illustrations/' + image._id,
                      query: {
                        index: JSON.stringify(i),
                      },
                    }}
                  >
                    <Image className="image-to-display" src={image.imageUrl} alt={image.fileName} fill></Image>
                  </Link>
                </div>
              );
            })
          : ''}
      </div>
    </>
  );
};

export default Illustrations;

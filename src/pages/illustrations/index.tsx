import { ImageDocument } from '@/app/api/models';
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
        {/* {images.length > 0
          ? images.map((image) => {
              return (
                <div key={image._id} className="illustration">
                  <Image
                    className="image-to-display"
                    src={'https://wilmaenstrom.blob.core.windows.net/wilmascontainer/example.jpg'}
                    alt={'hej'}
                    fill
                  ></Image>
                </div>
              );
            })
          : ''} */}
        {/* <Image
          className="image-to-display"
          src={'https://wilmaenstrom.blob.core.windows.net/wilmascontainer/example.jpg'}
          alt={'hej'}
          fill
        ></Image> */}
      </div>
    </>
  );
};

export default Illustrations;

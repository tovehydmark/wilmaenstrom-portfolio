import { ImageDocument } from '@/app/api/models/Image';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Illustrations = () => {
  const [images, setImages] = useState<ImageDocument[]>();
  const router = useRouter();

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

  const viewImage = (id: string) => {
    router.push('/illustrations/' + id);
  };

  return (
    <>
      <div className="illustration-container">
        {images
          ? images.map((image) => {
              return (
                <div key={image._id} className="illustration">
                  <Image
                    className="image-to-display"
                    src={image.imageUrl}
                    alt={image.fileName}
                    fill
                    onClick={() => viewImage(image?._id ? image._id : '')}
                  ></Image>
                </div>
              );
            })
          : ''}
      </div>
    </>
  );
};

export default Illustrations;

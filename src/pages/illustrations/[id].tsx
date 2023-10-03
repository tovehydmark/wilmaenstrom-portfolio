import { ImageDocument } from '@/app/api/models/Image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SelctedImage = () => {
  const [images, setImages] = useState<ImageDocument[]>();
  const [image, setImage] = useState<ImageDocument>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/getImage/' + router.query.id);
        const data: any = await response.json();
        setImage(data.image);

        const getAllImagesResponse = await fetch('/api/getImages');
        const allImageData: any = await getAllImagesResponse.json();
        setImages(allImageData.images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router.query.id]);

  const currentIndex = images?.findIndex((img) => img._id === router.query.id);

  const handlePrevious = () => {
    if (images && currentIndex !== undefined && currentIndex > 0) {
      const previousImage = images[currentIndex - 1];
      router.push(`/illustrations/${previousImage._id}`);
    }
  };

  const handleNext = () => {
    if (images && currentIndex !== undefined && currentIndex < images.length - 1) {
      const nextImage = images[currentIndex + 1];
      router.push(`/illustrations/${nextImage._id}`);
    }
  };

  return (
    <>
      <button onClick={handlePrevious}>Föregående</button>
      <div className="selected-image-display-page">
        {image ? (
          <Image
            className="selected-image"
            src={image.imageUrl}
            alt={'alt'}
            fill
            style={{
              objectFit: 'contain',
            }}
          ></Image>
        ) : (
          ''
        )}
        <article className="selected-image-info">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae possimus ea error vitae. Neque
            architecto vel laboriosam nostrum ab assumenda, aliquid voluptatibus qui illo ipsam unde fuga amet itaque!
            Officiis.
          </p>
        </article>
      </div>
      <button onClick={handleNext}>Nästa</button>
    </>
  );
};
export default SelctedImage;

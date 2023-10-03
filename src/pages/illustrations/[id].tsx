import { ImageDocument } from '@/app/api/models/Image';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SelctedImage({ data }) {
  const [images, setImages] = useState<ImageDocument[]>(data.images);
  const [image, setImage] = useState<ImageDocument>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        images.map((image) => {
          console.log(image);
          if (image._id === router.query.id) {
            setImage(image);
          }
        });
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
}

export async function getServerSideProps(context) {
  const { req } = context;
  const baseUrl = `${req.headers.host}`;
  const protocol = req.headers['x-forwarded-proto'] || 'http';

  try {
    const response = await fetch(`${protocol}://${baseUrl}/api/getImages`);
    const data: ImageDocument[] = await response.json();

    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        error: 'An error occurred while fetching data',
      },
    };
  }
}

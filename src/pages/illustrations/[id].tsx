import { ImageDocument } from '@/app/api/models/Image';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faX } from '@fortawesome/free-solid-svg-icons';

export default function SelctedImage({ data }) {
  const [images, setImages] = useState<ImageDocument[]>(data.images);
  const [image, setImage] = useState<ImageDocument>();
  const [imageDescription, setImageDescription] = useState<string>();
  const [disableNextButton, setDisableNextButton] = useState<boolean>(false);
  const [disablePreviousButton, setDisablePreviousButton] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        images.map((image) => {
          if (image._id === router.query.id) {
            setImage(image);
            setImageDescription(image.imageDescription);
          }
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router.query.id, images]);
  const currentIndex = images?.findIndex((img) => img._id === router.query.id);

  useEffect(() => {
    if (currentIndex == 0) {
      setDisablePreviousButton(true);
    } else {
      setDisablePreviousButton(false);
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    if (images && currentIndex !== undefined && currentIndex > 0) {
      const previousImage = images[currentIndex - 1];
      router.push(`/illustrations/${previousImage._id}`);
    }
    if (currentIndex == 0) {
      setDisablePreviousButton(true);
    } else {
      setDisablePreviousButton(false);
      setDisableNextButton(false);
    }
  };

  const handleNext = () => {
    if (images && currentIndex !== undefined && currentIndex < images.length - 1) {
      const nextImage = images[currentIndex + 1];
      router.push(`/illustrations/${nextImage._id}`);
    }

    if (images.length - 2 == currentIndex) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  };

  const exitSelectedImageView = () => {
    router.push('/');
  };

  return (
    <>
      <div className="selected-image-display-page">
        <button className="close-selected-image-view">
          <FontAwesomeIcon icon={faX} size="xl" onClick={exitSelectedImageView} />
        </button>
        {image ? (
          <div className="selected-img-container">
            <Image
              className="selected-image"
              src={image.imageUrl}
              alt={'alt'}
              fill
              style={{
                objectFit: 'contain',
              }}
            ></Image>
            <div className="buttons-layout-selected-image-display">
              <button onClick={handlePrevious} disabled={disablePreviousButton}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button onClick={handleNext} disabled={disableNextButton}>
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
            <article className="selected-image-info">
              <p>{imageDescription}</p>
            </article>
          </div>
        ) : null}
      </div>
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

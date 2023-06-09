import Layout from '@/app/layout';
import Image from 'next/image';

const Illustrations = () => {
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
  return (
    <>
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

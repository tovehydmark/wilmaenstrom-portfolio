import { ImageDocument } from '@/app/api/models/Image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SelctedImage = () => {
  const [image, setImage] = useState<ImageDocument>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/getImage/' + router.query.id);
        const data: any = await response.json();

        setImage(data.image);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router.query.id]);

  return (
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
  );
};
export default SelctedImage;

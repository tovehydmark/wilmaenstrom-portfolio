import { useEffect, useState } from 'react';
import Navigation from './Navigation';

const Header = () => {
  const [headerImage, setHeaderImage] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/userinfo/getHeaderImage');
        const data = await response.json();
        console.log('data.image.imageUrl', data.image.imageUrl);

        if (data && data.image) {
          setHeaderImage(data.image.imageUrl);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [headerImage]);

  return (
    <>
      <header
        style={{
          backgroundImage: `url('${headerImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          height: '250px',
        }}
      >
        <div className="header-name-container">
          <div>
            <h1>Wilma Enström</h1>
            <p>Visual artist</p>
          </div>
        </div>
        <Navigation></Navigation>
      </header>
    </>
  );
};

export default Header;

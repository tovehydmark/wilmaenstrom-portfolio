import { useEffect, useState } from 'react';
import Navigation from './Navigation';

const Header = () => {
  const [headerImage, setHeaderImage] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/userinfo/getHeaderImage');
        const data = await response.json();

        if (data && data.image) {
          setHeaderImage(data.image.imageUrl);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [headerImage]); // Dependency array should contain headerImage

  console.log(headerImage);

  return (
    <>
      <header style={{ backgroundImage: `url('${headerImage}')` }}>
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

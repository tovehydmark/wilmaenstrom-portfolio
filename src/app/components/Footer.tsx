import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer>
        <h3>Wilma Enström</h3>
        <div>
          <Link href={'https://www.instagram.com/wilmaenstrom/'} target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href={'https://www.tiktok.com/@jiminsimmin'} target="_blank">
            <FontAwesomeIcon icon={faTiktok} />
          </Link>
          <Link href={'https://www.facebook.com/715780228/'} target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </div>
      </footer>
    </>
  );
};
export default Footer;

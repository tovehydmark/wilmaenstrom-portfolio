import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Illustrationer</Link>
        </li>
        <li>
          <Link href="/about">Om mig</Link>
        </li>
        <li>
          <Link href="/contact">Blogg</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

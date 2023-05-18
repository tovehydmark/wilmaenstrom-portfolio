import styles from './page.module.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Illustrations from '@/pages/illustrations';

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <Illustrations></Illustrations>
      </main>
      <Footer></Footer>
    </>
  );
}

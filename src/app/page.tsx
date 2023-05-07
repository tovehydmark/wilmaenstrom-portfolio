import styles from './page.module.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header></Header>
      <main className={styles.main}></main>
      <Footer></Footer>
    </>
  );
}

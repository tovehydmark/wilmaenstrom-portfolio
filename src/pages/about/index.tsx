import Layout from '@/app/components/layout';

const About = () => {
  return (
    <>
      <Layout>
        <h1>Om mig</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>

        <h2>Utbildning</h2>
        <p>Etnologi</p>
        <p>Konsthistoria</p>
        <p>Digital humaniora</p>

        <h2>Arbetserfarenhet</h2>
        <ul>
          <li>Afroart</li>
        </ul>
      </Layout>
    </>
  );
};

export default About;

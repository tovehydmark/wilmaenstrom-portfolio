import { ContactDocument } from '@/app/api/models/contact';
import Layout from '@/app/components/layout';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactDocument>();

  useEffect(() => {
    (async () => {
      //Get contact data
      try {
        const response = await fetch('/api/userinfo/getContactInfo');
        const data: any = await response.json();

        setContactInfo(data.about);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Layout>
        <section className="contact-container">
          <h1>Kontakt</h1>
          <p>
            Om du är intresserad av att anställa mig på ditt företag eller köpa min konst, var god och hör av dig till
            mig, för hur ska jag annars veta?? Jag är väl fan inte tankeläsare!
          </p>
          <br />
          <p>wilmaenstrom@gmail.com</p>
          <br />
          <p>+4670 7770 7070</p>
        </section>
      </Layout>
    </>
  );
};

export default Contact;

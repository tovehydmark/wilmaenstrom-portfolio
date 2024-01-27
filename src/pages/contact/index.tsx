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

        setContactInfo(data.contact);
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
          <p>{contactInfo?.description}</p>
          <p>{contactInfo?.email}</p>
          <p>{contactInfo?.phone}</p>
        </section>
      </Layout>
    </>
  );
};

export default Contact;

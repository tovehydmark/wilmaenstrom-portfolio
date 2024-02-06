import SideMenu from '@/app/components/admin/SideMenu';
import ContactCard from '@/app/components/admin/about/ContactCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ContactInfo = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();

  const [addContactData, setAddContactData] = useState(false);
  const [description, setDescription] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const checkIfUserIsAuthenticated = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return false;
    }
    try {
      setUserIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  useEffect(() => {
    const isAuthenticated = checkIfUserIsAuthenticated();
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      //Get about data
      try {
        const response = await fetch('/api/userinfo/getContactInfo');
        const data: any = await response.json();

        if (data.contact.description) {
          setDescription(data.contact.description);
        }
        if (data.contact.phone) {
          setPhone(data.contact.phone);
        }
        if (data.contact.email) {
          setEmail(data.contact.email);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [addContactData]);

  return (
    <>
      {userIsAuthenticated ? (
        <section className="about-container">
          <SideMenu></SideMenu>
          <h1>Kontakt</h1>
          <p>
            Det är bra med kontaktuppgifter om någon vill kontakta dig. Här kan du skriva ett meddelande som du vill att
            dina besökare ser. Och lägga till kontaktuppgifter såklart.
          </p>
          <hr />

          <h2>Meddelande</h2>
          <p>{description}</p>
          <br />
          <h2>Telefonnummer</h2>
          <p>{phone}</p>
          <br />
          <h2>Email</h2>
          <p>{email}</p>
          <button
            onClick={() => setAddContactData(!addContactData)}
            className={!addContactData ? 'primary-btn center' : 'secondary-btn center'}
          >
            {!addContactData ? 'Redigera' : 'Avbryt'}
          </button>
          {addContactData ? (
            <ContactCard
              descriptionProp={description}
              phoneProp={phone}
              emailProp={email}
              onSave={() => setAddContactData(false)}
            ></ContactCard>
          ) : (
            <></>
          )}
          <hr />
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ContactInfo;

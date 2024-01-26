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
        <>
          <SideMenu></SideMenu>
          <h2>Kontakt</h2>
          <p>Det är bra med kontaktuppgifter om någon vill kontakta dig</p>
          <button
            onClick={() => setAddContactData(!addContactData)}
            className={!addContactData ? 'primary-btn center' : 'secondary-btn center'}
          >
            {!addContactData ? 'Redigera' : 'Avbryt'}
          </button>

          {addContactData ? <ContactCard onSave={() => addContactData(false)}></ContactCard> : <></>}
          <hr />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ContactInfo;

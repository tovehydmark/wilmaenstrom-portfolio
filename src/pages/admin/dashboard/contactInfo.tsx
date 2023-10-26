import SideMenu from '@/app/components/admin/SideMenu';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ContactInfo = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();

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

  return (
    <>
      {userIsAuthenticated ? (
        <>
          <SideMenu></SideMenu>
          <p>CONTACT info </p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ContactInfo;

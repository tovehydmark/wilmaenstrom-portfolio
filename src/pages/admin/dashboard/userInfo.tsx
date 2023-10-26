import SideMenu from '@/app/components/admin/SideMenu';
import EducationCard from '@/app/components/admin/about/EducationCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();
  const [addEducation, setAddEducation] = useState(false);

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
  //Run useEffect to rerender component with new data after data is saved
  useEffect(() => {}, [addEducation]);

  return (
    <>
      {userIsAuthenticated ? (
        <>
          <SideMenu></SideMenu>
          Om mig PAGE
          <button onClick={() => setAddEducation(true)}>Lägg till utbildning</button>
          {addEducation ? <EducationCard onSave={() => setAddEducation(false)}></EducationCard> : <></>}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UserInfo;

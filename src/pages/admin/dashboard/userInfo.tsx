import SideMenu from '@/app/components/admin/SideMenu';
import EducationCard from '@/app/components/admin/about/EducationCard';
import WorkexperienceCard from '@/app/components/admin/about/WorkexperienceCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();
  const [addEducation, setAddEducation] = useState(false);
  const [addWorkexperience, setAddWorkexperience] = useState(false);

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
  useEffect(() => {}, [addEducation, addWorkexperience]);

  return (
    <>
      {userIsAuthenticated ? (
        <>
          <SideMenu></SideMenu>
          <h1>Om mig</h1>
          <p>Här kan du lägga till och uppdatera information om dig.</p>
          <h2>Utbildning</h2>
          <button onClick={() => setAddEducation(true)}>Lägg till utbildning</button>
          {addEducation ? <EducationCard onSave={() => setAddEducation(false)}></EducationCard> : <></>}

          <h2>Arbetserfarenhet</h2>
          <button onClick={() => setAddWorkexperience(true)}>Lägg till arbetserfarenhet</button>
          {addWorkexperience ? (
            <WorkexperienceCard onSave={() => setAddWorkexperience(false)}></WorkexperienceCard>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UserInfo;

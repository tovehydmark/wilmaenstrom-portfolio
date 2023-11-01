import { AboutDocument } from '@/app/api/models/about';
import { EducationDocument } from '@/app/api/models/education';
import { WorkexperienceDocument } from '@/app/api/models/workexperience';
import SideMenu from '@/app/components/admin/SideMenu';
import AboutCard from '@/app/components/admin/about/AboutCard';
import EducationCard from '@/app/components/admin/about/EducationCard';
import WorkexperienceCard from '@/app/components/admin/about/WorkexperienceCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();
  const [addAbout, setAddAbout] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [addWorkexperience, setAddWorkexperience] = useState(false);
  const [about, setAbout] = useState<string>('');
  const [education, setEducation] = useState<EducationDocument[]>();
  const [workexperience, setWorkexperience] = useState<WorkexperienceDocument[]>();

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
        const response = await fetch('/api/userinfo/getAboutInfo');
        const data: any = await response.json();
        if (data.about.description) {
          setAbout(data.about.description);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      //Get education data
      try {
        const response = await fetch('/api/userinfo/getEducationInfo');
        const data: any = await response.json();

        setEducation(data.education);
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      //Get work experience data
      try {
        const response = await fetch('/api/userinfo/getWorkexperienceInfo');
        const data: any = await response.json();

        setWorkexperience(data.workexperience);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [addAbout, addEducation, addWorkexperience]);

  return (
    <>
      {userIsAuthenticated ? (
        <>
          <section className="about-container">
            <SideMenu></SideMenu>

            <h1>Om mig</h1>
            <button onClick={() => setAddAbout(!addAbout)} className="primary-btn center">
              {!addAbout ? 'Redigera om dig' : 'Avbryt'}
            </button>
            {addAbout ? <AboutCard aboutInfo={about} onSave={() => setAddAbout(false)}></AboutCard> : <></>}
            {about ? <p>{about}</p> : <></>}

            <h2>Utbildning</h2>
            <button onClick={() => setAddEducation(!addEducation)} className="primary-btn center">
              {!addEducation ? 'Lägg till utbildning' : 'Avbryt'}
            </button>
            {addEducation ? <EducationCard onSave={() => setAddEducation(false)}></EducationCard> : <></>}

            <section className="education-section">
              {education ? (
                education.map((edu) => {
                  return (
                    <article key={edu._id}>
                      <h3>{edu.degree}</h3>
                      <h4>{edu.school}</h4>
                      <p>{edu.description}</p>
                    </article>
                  );
                })
              ) : (
                <></>
              )}
            </section>

            <h2>Arbetserfarenhet</h2>
            <button onClick={() => setAddWorkexperience(!addWorkexperience)} className="primary-btn center">
              {!addWorkexperience ? 'Lägg till arbetserfarenhet' : 'Avbryt'}
            </button>
            {addWorkexperience ? (
              <WorkexperienceCard onSave={() => setAddWorkexperience(false)}></WorkexperienceCard>
            ) : (
              <></>
            )}
            <section className="work-experience-section">
              {workexperience ? (
                workexperience.map((experience) => {
                  return (
                    <article key={experience._id}>
                      <h3>{experience.workplace}</h3>
                      <h4>{experience.city}</h4>
                      <p>{experience.description}</p>
                    </article>
                  );
                })
              ) : (
                <></>
              )}
            </section>
          </section>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default UserInfo;

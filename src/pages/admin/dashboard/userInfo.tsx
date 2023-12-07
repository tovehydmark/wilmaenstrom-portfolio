import { AboutDocument } from '@/app/api/models/about';
import { EducationDocument } from '@/app/api/models/education';
import { WorkexperienceDocument } from '@/app/api/models/workexperience';
import SideMenu from '@/app/components/admin/SideMenu';
import AboutCard from '@/app/components/admin/about/AboutCard';
import EducationCard from '@/app/components/admin/about/EducationCard';
import HeaderImageCard from '@/app/components/admin/about/HeaderImageCard';
import WorkexperienceCard from '@/app/components/admin/about/WorkexperienceCard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();
  const [addHeader, setAddHeader] = useState(false);
  const [addAbout, setAddAbout] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [addWorkexperience, setAddWorkexperience] = useState(false);
  const [header, setHeader] = useState<string>('');
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
      //Get header data
      try {
        const response = await fetch('/api/userinfo/getHeaderImage');
        const data: any = await response.json();

        //ÄNDRA
        if (data.about.description) {
          setHeader(data.about.description);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [header]);

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
  }, [addAbout]);

  useEffect(() => {
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
  }, [addEducation]);

  useEffect(() => {
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
  }, [addWorkexperience]);

  return (
    <>
      {userIsAuthenticated ? (
        <>
          <section className="about-container">
            <SideMenu></SideMenu>
            <h1>Information om dig</h1>

            <p>
              På denna sida kan du uppdatera bilden i din header samt den information om dig som du vill presentera på
              din hemsida.
            </p>
            <hr />

            <h2>Headerbild</h2>
            <p>Gör din sida mer personlig genom att ladda upp en bild till din header.</p>
            {addHeader ? <HeaderImageCard image={image} onSave={() => setAddHeader(false)}></HeaderImageCard> : <></>}

            <button
              onClick={() => setAddHeader(!addHeader)}
              className={!addHeader ? 'primary-btn center' : 'secondary-btn center'}
            >
              {!addHeader ? 'Redigera' : 'Avbryt'}
            </button>
            <hr />

            <h2>Om mig</h2>

            {addAbout ? <AboutCard aboutInfo={about} onSave={() => setAddAbout(false)}></AboutCard> : <></>}
            {about && !addAbout ? <p>{about}</p> : <></>}
            <button
              onClick={() => setAddAbout(!addAbout)}
              className={!addAbout ? 'primary-btn center' : 'secondary-btn center'}
            >
              {!addAbout ? 'Redigera' : 'Avbryt'}
            </button>

            <hr />
            <h2>Utbildning</h2>
            <button
              onClick={() => setAddEducation(!addEducation)}
              className={!addEducation ? 'primary-btn center' : 'secondary-btn center'}
            >
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
            <hr />
            <h2>Arbetserfarenhet</h2>
            <button
              onClick={() => setAddWorkexperience(!addWorkexperience)}
              className={!addWorkexperience ? 'primary-btn center' : 'secondary-btn center'}
            >
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

import { AboutDocument } from '@/app/api/models/about';
import { EducationDocument } from '@/app/api/models/education';
import { WorkexperienceDocument } from '@/app/api/models/workexperience';
import Layout from '@/app/components/layout';
import { useEffect, useState } from 'react';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutDocument>();
  const [education, setEducation] = useState<EducationDocument[]>();
  const [workexperience, setWorkexperience] = useState<WorkexperienceDocument[]>();

  useEffect(() => {
    (async () => {
      //Get about data
      try {
        const response = await fetch('/api/userinfo/getAboutInfo');
        const data: any = await response.json();

        setAboutInfo(data.about.description);
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
  }, []);

  return (
    <>
      <Layout>
        <section className="about-container">
          <h1>Om mig</h1>
          <article>
            <p>{aboutInfo}</p>
          </article>
          <h2>Utbildning</h2>
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
      </Layout>
    </>
  );
};

export default About;

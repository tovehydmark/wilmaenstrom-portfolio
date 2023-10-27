import { EducationDocument } from '@/app/api/models/education';
import Layout from '@/app/components/layout';
import { useEffect, useState } from 'react';

const About = () => {
  const [education, setEducation] = useState<EducationDocument[]>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/userinfo/getEducationInfo');
        const data: any = await response.json();

        setEducation(data.education);
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
            <p>
              Jag heter Wilma, är en 22 år gammal bildkonstnär och gillar månalver. När jag var 25 år gammal upptäckte
              jag BTS och sen dess finns ingen återvändo. Nu bor jag i Australien och vill inte annat än att stanna på
              grund av alla asiater som bor här.
            </p>
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
            <article>
              <h3>Afroart</h3>
              <h4>Stockholm</h4>

              <p>
                Här sålde jag olika saker och jag hade även en praktikant en gång som var jättebra på att märka varor
                med en sån där pistol som man skjuter fast lappar med.
              </p>
            </article>
            <article>
              <h3>Lakritsroten</h3>
              <h4>Stockholm</h4>

              <p>
                Åt jättemycket lakrits när jag jobbade här fast i smyg och så lurade jag turister och dumma svennar att
                saltlakrits var sötlakrits och de spydde och jag skrattade åt dem högt. Fick sparken pga stal ur kassan
                några gånger.
              </p>
            </article>
            <article>
              <h3>Bröd och salt</h3>
              <h4>Stockholm</h4>

              <p>
                Bröd och salt. Ja du hör ju. Malde mjöl och saltade det och så bakade någon annan bröd och jag åt det
                sen gick jag hem.
              </p>
            </article>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default About;

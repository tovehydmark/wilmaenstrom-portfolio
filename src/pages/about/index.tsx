import Layout from '@/app/components/layout';

const About = () => {
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
            <article>
              <h3>Digital humaniora - Master</h3>
              <h4>Uppsala Universitet</h4>
              <p>
                Satt vid datorn och knappade samtidigt som jag låtsades att läraren var full. Egentligen var det bara en
                ursäkt för jag var full själv men det sa jag inte till någon. Fick ändå helt ok betyg med hjälp av en
                såndär person som man betalar för att de ska skriva ens uppsatser.
              </p>
            </article>

            <article>
              <h3>Konsthistoria - Kandidat</h3>
              <h4>Uppsala Universitet</h4>
              Den här utbildningen tog jag bara för att jag tänkte att den kan vara bra att ha när man söker jobb inom
              konst men vad vet jag. Önskar man inte behövde utbilda sig så jävla mycket fast jag tycker ju i och för
              sig att det är kul för man behöver inte göra annat än att stirra på läraren och le för att få bra betyg.
              Det lärde jag mig.
            </article>
            <article>
              <h3>Etnologi - Kandidat </h3>
              <h4>Uppsala Universitet</h4>
              <p>
                Den här utbildningen tog jag bara för att det är kul att få studera människor och deras beteenden som är
                helt sjuka ibland men ibland är de inte så konstiga som jag trodde innan så det kanske var bra att jag
                pluggade detta ändå eftersom jag inte visste att det finns normala människor också.
              </p>
            </article>
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

import React, { useEffect, useState } from 'react';

const AboutCard = ({ onSave }) => {
  const [about, setAbout] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(about.trim() !== '');
  }, [about]);

  const saveData = async (e) => {
    e.preventDefault();

    const dataToSend = {
      description: about,
    };

    try {
      const response = await fetch('/api/userinfo/postAboutInfo', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        onSave();
      } else {
        console.log('something went wrong', response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => saveData(e)} className="about-admin-cards">
        <label htmlFor="description">Om</label>
        <textarea rows={5} name="description" value={about} onChange={(e) => setAbout(e.target.value)} />
        <div>
          <button className="primary-btn right-align" type="submit" value="Spara" disabled={!isFormValid}>
            Spara
          </button>
        </div>
      </form>
    </>
  );
};

export default AboutCard;

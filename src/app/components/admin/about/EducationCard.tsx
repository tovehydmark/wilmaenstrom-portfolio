import React, { useState, useEffect } from 'react';

const EducationCard = ({ onSave }) => {
  const [degree, setDegree] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(degree.trim() !== '' && school.trim() !== '' && description.trim() !== '');
  }, [degree, school, description]);

  const saveData = async (e) => {
    e.preventDefault();

    const dataToSend = {
      degree: degree,
      school: school,
      description: description,
    };

    try {
      const response = await fetch('/api/userinfo/postEducationInfo', {
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
        <label htmlFor="course">Kurs</label>
        <input type="text" name="course" value={degree} onChange={(e) => setDegree(e.target.value)} />
        <label htmlFor="school">Skola</label>
        <input type="text" name="school" value={school} onChange={(e) => setSchool(e.target.value)} />
        <label htmlFor="description">Beskrivning</label>
        <textarea rows={5} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div>
          <button className="primary-btn right-align" type="submit" value="Spara" disabled={!isFormValid}>
            Spara
          </button>
        </div>
      </form>
    </>
  );
};

export default EducationCard;

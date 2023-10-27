import { useState } from 'react';

const EducationCard = ({ onSave }) => {
  const [degree, setDegree] = useState('');
  const [school, setSchool] = useState('');
  const [description, setDescription] = useState('');

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

    console.log('dataToSend', dataToSend);
  };

  return (
    <>
      <form onSubmit={(e) => saveData(e)}>
        <label htmlFor="course">Kurs</label>
        <input type="text" name="course" onChange={(e) => setDegree(e.target.value)} />
        <label htmlFor="school">Skola</label>
        <input type="text" name="school" onChange={(e) => setSchool(e.target.value)} />
        <label htmlFor="description">Beskrivning</label>
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />

        <input type="submit" value="Spara" />
      </form>
    </>
  );
};
export default EducationCard;

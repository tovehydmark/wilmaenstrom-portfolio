import { useState } from 'react';

const WorkexperienceCard = ({ onSave }) => {
  const [workplace, setworkplace] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');

  const saveData = async (e) => {
    e.preventDefault();

    const dataToSend = {
      workplace: workplace,
      city: city,
      description: description,
    };

    try {
      const response = await fetch('/api/userinfo/postWorkexperienceInfo', {
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
        <label htmlFor="workplace">Arbetsplats</label>
        <input type="text" name="workplace" onChange={(e) => setworkplace(e.target.value)} />
        <label htmlFor="city">Stad</label>
        <input type="text" name="city" onChange={(e) => setCity(e.target.value)} />
        <label htmlFor="description">Beskrivning</label>
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />

        <input type="submit" value="Spara" />
      </form>
    </>
  );
};
export default WorkexperienceCard;

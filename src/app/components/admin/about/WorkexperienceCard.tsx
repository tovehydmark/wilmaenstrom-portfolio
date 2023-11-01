import { useEffect, useState } from 'react';

const WorkexperienceCard = ({ onSave }) => {
  const [workplace, setworkplace] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(workplace.trim() !== '' && city.trim() !== '' && description.trim() !== '');
  }, [workplace, city, description]);

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
  };

  return (
    <>
      <form onSubmit={(e) => saveData(e)} className="about-admin-cards">
        <label htmlFor="workplace">Arbetsplats</label>
        <input type="text" name="workplace" onChange={(e) => setworkplace(e.target.value)} />
        <label htmlFor="city">Stad</label>
        <input type="text" name="city" onChange={(e) => setCity(e.target.value)} />
        <label htmlFor="description">Beskrivning</label>
        <textarea rows={5} name="description" onChange={(e) => setDescription(e.target.value)} />
        <div>
          <button className="primary-btn right-align" type="submit" value="Spara" disabled={!isFormValid}>
            Spara
          </button>
        </div>
      </form>
    </>
  );
};
export default WorkexperienceCard;

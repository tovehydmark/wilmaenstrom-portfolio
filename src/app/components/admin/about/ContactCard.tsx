import React, { useState, useEffect } from 'react';

const ContactCard = ({ descriptionProp, phoneProp, emailProp, onSave }) => {
  const [description, setDescription] = useState<string>(descriptionProp ? descriptionProp : '');
  const [phone, setPhone] = useState<string>(phoneProp ? phoneProp : '');
  const [email, setEmail] = useState<string>(emailProp ? emailProp : '');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(phone.trim() !== '' && email.trim() !== '' && description.trim() !== '');
  }, [email, phone, description]);

  const saveData = async (e) => {
    e.preventDefault();

    const dataToSend = {
      description: description,
      phone: phone,
      email: email,
    };

    try {
      const response = await fetch('/api/userinfo/postContactInfo', {
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
        <label htmlFor="description">Beskrivning</label>
        <textarea rows={5} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="course">Telefon</label>

        <input type="text" name="course" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor="school">Email</label>
        <input type="text" name="school" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div>
          <button className="primary-btn right-align" type="submit" value="Spara" disabled={!isFormValid}>
            Spara
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactCard;

import React from 'react';
import ImageUploadForm from '../../ImageUploadForm';

const HeaderImageCard = ({ onSave }) => {
  return (
    <>
      <ImageUploadForm onSave={onSave} apiString={'postHeaderImgToAzure'} isHeader={true}></ImageUploadForm>
    </>
  );
};

export default HeaderImageCard;

import { useState } from 'react';

const ImageUploadForm = () => {
  const [image, setImage] = useState<any>();

  const handleSubmit = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      console.log('reader.error', reader.error);
    };
  };

  const uploadImage = async () => {
    try {
      const response = await fetch('/api/postImage', {
        method: 'POST',
        body: JSON.stringify(image),
      });
      console.log('response', response);

      if (response.ok) {
        console.log('Image uploaded successfully!');
      } else {
        console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleSubmit} />
      <button onClick={uploadImage}>Upload</button>
      {image === '' || image === null ? '' : <img width={100} height={100} src={image} alt="alttext"></img>}
    </>
  );
};

export default ImageUploadForm;

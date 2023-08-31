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

  console.log('image', image);

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
      <section className="upload-file-section">
        {' '}
        {!image ? '' : <img className="image-for-upload" src={image} alt="alttext"></img>}
        <div className="upload-file-container">
          <input type="file" accept="image/*" onChange={handleSubmit} />
          <button onClick={uploadImage}>Upload</button>
        </div>
      </section>
    </>
  );
};

export default ImageUploadForm;

import { useState } from 'react';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('file', file);

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      console.log('formData', formData);

      try {
        const response = await fetch('/api/postImage', {
          method: 'POST',
          body: formData,
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;

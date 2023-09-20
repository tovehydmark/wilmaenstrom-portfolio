import { useState } from 'react';

interface ImageDocument {
  name: string;
  type: string;
}

const ImageUploadForm = () => {
  const [image, setImage] = useState<any>(null);
  const [imageInfo, setImageInfo] = useState<ImageDocument>();

  const handleSubmit = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setImageInfo({ name: e.target.files[0].name, type: e.target.files[0].type });

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      console.log('reader.error', reader.error);
    };
  };

  const uploadImage = async () => {
    try {
      if (imageInfo) {
        const headers = {
          'Content-Type': imageInfo.type,
          imageName: imageInfo.name,
        };

        const response = await fetch('/api/postImage', {
          method: 'POST',
          body: image,
          headers: headers,
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');
        } else {
          console.error('Image upload failed.');
        }
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
          <button onClick={uploadImage}>Ladda upp bild</button>
        </div>
      </section>
    </>
  );
};

export default ImageUploadForm;

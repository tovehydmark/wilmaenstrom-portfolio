import { useState } from 'react';

interface ImageDocument {
  name: string;
  type: string;
}

const ImageUploadForm = () => {
  const [image, setImage] = useState<any>(null);
  const [imageInfo, setImageInfo] = useState<ImageDocument>();
  const [imageDescription, setImageDescription] = useState('');

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      setImageInfo({ name: e.target.files[0].name, type: e.target.files[0].type });

      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = () => {
        console.log('reader.error', reader.error);
      };
    }
  };

  const uploadImage = async () => {
    try {
      if (imageInfo) {
        const headers = {
          'Content-Type': imageInfo.type,
          imageName: imageInfo.name,
        };

        const response = await fetch('/api/postImageToAzure', {
          method: 'POST',
          body: image,
          headers: headers,
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');

          const imageData = await response.json();

          try {
            const responseFromMongoDB = await fetch('/api/postImageInfoToMongoDB', {
              method: 'POST',
              body: JSON.stringify({
                imageData: imageData,
                imageDescription: imageDescription,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (responseFromMongoDB.ok) {
              console.log('image saved to MongoDB');
            } else {
              console.log('Something went wrong, the image was not saved to MongoDB');
            }
          } catch (error) {
            console.log('error', error);
          }
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

          <label htmlFor="textarea">Skriv en bildtext</label>
          <textarea
            onChange={(e) => setImageDescription(e.target.value)}
            className="image-description-textarea"
            id="textarea"
          />
          <button onClick={uploadImage}>Ladda upp bild</button>
        </div>
      </section>
    </>
  );
};

export default ImageUploadForm;

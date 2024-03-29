import { useEffect, useState } from 'react';

interface ImageDocument {
  name: string;
  type: string;
}

const ImageUploadForm = ({ onSave, apiString, isHeader }) => {
  const [image, setImage] = useState<any>(null);
  const [imageInfo, setImageInfo] = useState<ImageDocument>();
  const [imageDescription, setImageDescription] = useState('');
  const [imageIsSelected, setImageIsSelected] = useState(false);
  const [apiRoute, setApiRoute] = useState(isHeader ? 'postHeaderImageToMongoDB' : 'postImageInfoToMongoDB');

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      setImageInfo({ name: e.target.files[0].name + Math.floor(Math.random() * 10000), type: e.target.files[0].type });

      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = () => {
        console.log('reader.error', reader.error);
      };
    }
    setImageIsSelected(true);
  };

  const uploadImage = async () => {
    try {
      if (imageInfo) {
        const headers = {
          'Content-Type': imageInfo.type,
          imageName: imageInfo.name,
        };

        const response = await fetch('/api/' + apiString, {
          method: 'POST',
          body: image,
          headers: headers,
        });

        if (response.ok) {
          console.log('Image uploaded successfully!');

          const imageData = await response.json();

          try {
            const responseFromMongoDB = await fetch('/api/' + apiRoute, {
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
              alert('image saved to MongoDB');
              onSave();
              setImage(null);
              setImageIsSelected(false);
            } else {
              alert('Something went wrong, the image was not saved to MongoDB');
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
        {!image ? '' : <img className="image-for-upload" src={image} alt="alttext"></img>}
        <div className="upload-file-container">
          <label htmlFor="file-upload" className="primary-btn">
            Välj fil
          </label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleSubmit} />
          {imageIsSelected ? (
            <>
              {!isHeader ? (
                <>
                  <label className="image-description-label" htmlFor="textarea">
                    Skriv en bildtext
                  </label>
                  <textarea
                    onChange={(e) => setImageDescription(e.target.value)}
                    className="image-description-textarea"
                    id="textarea"
                  />
                </>
              ) : null}

              <button
                onClick={uploadImage}
                disabled={!isHeader ? imageDescription.length < 1 : undefined}
                className="primary-btn"
              >
                Ladda upp bild
              </button>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default ImageUploadForm;

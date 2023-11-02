import { useState } from 'react';
import Dialog from './Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  id: string | undefined;
  fileName: string;
  imageUrl: string;
  imageDescription: string | undefined;
}

const PortfolioImage = (Props: Props) => {
  const { id, fileName, imageUrl, imageDescription } = Props;
  const [newImageDescription, setNewImageDescription] = useState('');
  const [updatingImageDescription, setUpdatingImageDescription] = useState(false);
  const [dialog, setDialog] = useState({
    message: '',
    isLoading: false,
  });

  const editImageDescription = async (id: string | undefined) => {
    try {
      const updatedImageDescriptionData = { updatedImageDescription: newImageDescription, id: id };
      const response = await fetch('/api/updateImageInformation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedImageDescriptionData),
      });

      if (response.ok) {
        alert('Bildbeskrivningen är uppdaterad!');
        setUpdatingImageDescription(false);
      }
    } catch {}
  };

  const handleDialog = (message: string, isLoading: boolean) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const deleteImage = async () => {
    handleDialog('Are you sure you want to delete?', true);
  };
  const areYouSureDeleteImage = async (choice: boolean) => {
    if (choice) {
      try {
        //Delete image from MongoDB
        const response = await fetch('/api/deleteImageFromMongoDB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
        });
        if (response.ok) {
          console.log('Image deleted from MongoDB!');
          //Delete image from Azure
          try {
            const response = await fetch('/api/deleteImageFromAzure', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fileName),
            });
            if (response.ok) {
              console.log('Image deleted from Azure!');
            } else {
              console.log('Something went wrong, image not deleted from Azure');
            }
          } catch (error) {
            console.log('Error', error);
          }
        } else {
          console.log('Error: Something went wrong, image not deleted from MongoDB.');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      handleDialog('', false);
    }
  };

  return (
    <section key={JSON.stringify(id)} className="admin-gallery-image">
      <img src={imageUrl} alt={fileName} width={300} height={300} style={{ objectFit: 'cover' }}></img>
      {updatingImageDescription ? (
        <div className="image-description-textarea">
          {' '}
          <textarea
            defaultValue={imageDescription}
            onChange={(e) => setNewImageDescription(e.target.value)}
            cols={30}
            rows={10}
          ></textarea>
          <button onClick={() => editImageDescription(id)}>Spara</button>
        </div>
      ) : (
        <p>{imageDescription}</p>
      )}
      <div className="btn-layout">
        <button className="icon-btn" onClick={deleteImage}>
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </button>
        {dialog.isLoading && <Dialog onDialog={areYouSureDeleteImage} message={dialog.message} />}{' '}
        <button className="icon-btn" onClick={() => setUpdatingImageDescription(true)}>
          <FontAwesomeIcon icon={faPen} size="xl" />
        </button>
      </div>
    </section>
  );
};
export default PortfolioImage;

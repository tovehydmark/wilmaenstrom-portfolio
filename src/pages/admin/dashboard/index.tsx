import { ImageDocument } from '@/app/api/models';
import ImageUploadForm from '@/app/components/ImageUploadForm';
import Illustrations from '@/pages/illustrations';

const Dashboard = () => {
  //Fetch all images in a grid
  //Enable to delete image on X
  //Post new image from here

  return (
    <>
      <section className="admin-greeting-section">
        <h1>Välkommen, Wilma!</h1>
        <p>Här kan du ladda upp nya bilder och hantera de bilder du laddat upp innan.</p>
      </section>
      <section className="admin-upload-image-section">
        <h2>Ladda upp ny bild</h2>
        <ImageUploadForm></ImageUploadForm>
      </section>
      <section className="admin-gallery">
        <h2>Galleri</h2>
        <Illustrations></Illustrations>
      </section>
    </>
  );
};

export default Dashboard;

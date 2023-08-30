import { ImageDocument } from '@/app/api/models';
import ImageUploadForm from '@/app/components/ImageUploadForm';

const Dashboard = () => {
  //Fetch all images in a grid
  //Enable to delete image on X
  //Post new image from here

  return (
    <>
      <h1>Post images</h1>
      <ImageUploadForm></ImageUploadForm>
    </>
  );
};

export default Dashboard;

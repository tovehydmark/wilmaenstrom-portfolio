import { ImageDocument } from '@/app/api/models';

const Dashboard = () => {
  //Fetch all images in a grid
  //Enable to delete image on X
  //Post new image from here

  const postImageString = async () => {
    const body = { title: '/BIBIB', src: '/mucha-4.jpeg' };

    try {
      let response = await fetch('/api/postImage', {
        method: 'POST',
        body: JSON.stringify(body),

        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      const data: ImageDocument[] = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Post images</h1>
      <button onClick={postImageString}>Posta</button>
    </>
  );
};

export default Dashboard;

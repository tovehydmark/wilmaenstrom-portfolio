import { MongoClient } from 'mongodb';
// import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';

const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function postImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // console.log('form', form);

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err);
        res.status(500).send('Error parsing form data.');
        return;
      }

      //Change any typing
      const imageFile: any = files.image;

      // console.log('imageFile', imageFile);

      try {
        const client = await clientPromise;
        const db = client.db('wilma-portfolio');

        console.log('imageFile', imageFile);

        const imageData = {
          filename: imageFile[0].originalFilename,
          contentType: imageFile[0].mimetype,
          data: imageFile[0].filepath,
        };

        // console.log('imageData', imageData);

        const result = await db.collection('images').insertOne(imageData);

        if (result) {
          console.log('result', result);

          res.status(200).send('Image uploaded and saved to MongoDB.');
        } else {
          res.status(500).send('Error saving image to MongoDB.');
        }
      } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).send('Error connecting to MongoDB.');
      } finally {
        console.log('Finally');

        // client.close();
      }
    });
  } else {
    res.status(405).send('Method not allowed.');
  }
}

export default postImage;

// import clientPromise from '@/app/lib/mongodb';
// import { NextApiRequest, NextApiResponse } from 'next';

// export async function postImage(req: NextApiRequest, res: NextApiResponse) {
//   console.log('post');

//   // console.log('req.body', req.body);

//   try {
//     const client = await clientPromise;
//     const db = client.db('wilma-portfolio');
//     const imageData = req.body;

//     const result = await db.collection('images').insertOne(imageData);

//     res.json(result);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// export default postImage;

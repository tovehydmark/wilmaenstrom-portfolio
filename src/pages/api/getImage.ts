// import clientPromise from '@/app/lib/mongodb';
// import { NextApiRequest, NextApiResponse } from 'next';

// export async function getImage(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('images');

//     const images = await db.collection('posts');

//     res.json(images);
//   } catch (e) {
//     console.error(e);
//   }
// }

// export default getImage;

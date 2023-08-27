// import { UserModel } from '@/app/api/models';
// import clientPromise from '@/app/lib/mongodb';
// import { NextApiRequest, NextApiResponse } from 'next/types';

// export async function login(req: NextApiRequest, res: NextApiResponse) {
//   console.log('req', req.body);

//   try {
//     const client = await clientPromise;
//     const db = client.db('wilma-portfolio');

//     const user = await UserModel.findOne({ username: req.body.username });

//     console.log('user', user);

//     if (!user) {
//       return res.json({
//         message: 'User not found.',
//       });
//     }

//     if (user.password === req.body.password) {
//       return res.json({
//         message: 'User Logged In',
//         userId: user._id,
//       });
//     } else {
//       return res.json({
//         message: 'Wrong Password',
//       });
//     }
//   } catch (error) {
//     console.log('error', error);

//     res.status(401).json({ error: error });
//   }
// }

// export default login;

import { UserModel } from '@/app/api/models';
import clientPromise from '@/app/lib/mongodb'; // Update import to match your file structure
import { NextApiRequest, NextApiResponse } from 'next/types';

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the MongoDB database
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    // Access the UserModel collection and query for the user
    const userCollection = db.collection('users');

    const user = await userCollection.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({
        message: 'User not found.',
      });
    }

    if (user.password === req.body.password) {
      return res.json({
        message: 'User Logged In',
        userId: user._id,
      });
    } else {
      console.log('fel lösen');

      return res.status(401).json({
        message: 'Wrong Password',
      });
    }
  } catch (error) {
    console.log('error', error);

    res.status(401).json({ error: error });
  }
}

export default login;

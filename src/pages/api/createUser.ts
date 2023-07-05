import { UserModel } from '@/app/api/models';
import { NextApiRequest, NextApiResponse } from 'next';

export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.body', req.body);

  try {
    const usernameTaken = await UserModel.findOne({
      username: req.body.username,
    });
    if (usernameTaken) {
      return res.status(403).send({ success: false, error: 'Username is taken' });
    }

    const emailTaken = await UserModel.findOne({ email: req.body.email });
    if (emailTaken) {
      return res.status(403).send({ success: false, error: 'Email taken' });
    }

    let newUser = new UserModel();
    newUser.username = req.body.username;
    // newUser.name = req.body.name;
    // newUser.email = req.body.email;
    newUser.setPassword(req.body.password);

    const user = await UserModel.create(newUser);

    console.log('user', user);

    res.status(201).send({ data: user });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default createUser;

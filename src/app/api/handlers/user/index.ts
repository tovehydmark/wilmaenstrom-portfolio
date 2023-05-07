import { NextApiRequest, NextApiResponse } from 'next';
import caseInsensitive from '../../../lib/caseInsensitiveCheck';
import  UserModel } from '../../models';


export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await UserModel.find({});
    res.status(200).send({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await UserModel.find({ _id: req.query.id }).populate('roles');
    const sendUser = { name: user[0].name, email: user[0].email };
    res.status(200).send({ data: sendUser });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usernameTaken = await UserModel.findOne({
      username: caseInsensitive(req.body.username),
    });
    if (usernameTaken) {
      return res.status(403).send({ success: false, error: 'Username is taken' });
    }

    const emailTaken = await UserModel.findOne({ email: caseInsensitive(req.body.email) });
    if (emailTaken) {
      return res.status(403).send({ success: false, error: 'Email taken' });
    }

       let newUser = new UserModel();
    newUser.username = req.body.username;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);

    // await GroupModel.findOneAndUpdate(
    //   { _id: '6304992d290bf07178ea7b16' },
    //   { $push: { onboardedStudents: newUser._id } },
    // );

    const user = await UserModel.create(newUser);
    res.status(201).send({ data: user._id });
  } catch (error) {
    res.status(401).send({ error: error });
  }
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    UserModel.findOne(
      { email: req.body.email },
      function (err: any, user: { validPassword: (arg0: any) => any; _id: any } | null) {
        if (user === null) {
          return res.json({
            message: 'User not found.',
          });
        } else {
          if (user.validPassword(req.body.password)) {
            return res.json({
              message: 'User Logged In',
              userId: user._id,
            });
          } else {
            return res.json({
              message: 'Wrong Password',
            });
          }
        }
      },
    );
  } catch (error) {
    res.status(401).json({ error: error });
  }
}


import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Method to check the entered password is correct or not
  const validPassword = (password: string, userPassword: string) => {
    const isPasswordValid = bcryptjs.compareSync(password, userPassword);

    return isPasswordValid;
  };

  return await NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'Credentials',
        credentials: {
          inputValue: {
            label: 'Username',
            type: 'text',
            placeholder: 'Användarnamn',
          },
          password: { label: 'Password', type: 'password' },
        },

        async authorize(credentials) {
          if (!credentials) throw Error('missing credentials');
          const { inputValue, password } = credentials;

          const regex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          const mongooseQuery = regex.test(inputValue) ? { email: inputValue } : { username: inputValue };

          const client = await clientPromise;
          const db = client.db('wilma-portfolio');
          const userCollection = db.collection('users');
          const user = await userCollection.findOne(mongooseQuery).then((res: any) => {
            if (!res) {
              throw Error('invalid user');
            }
            if (res) {
              const correctPass = validPassword(password, res.password);
              if (correctPass) {
                return res;
              }
              throw Error('incorrect password');
            }
            throw Error('invalid user');
          });
          return user;
        },
      }),
    ],

    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async session({ session, token, user }) {
        const client = await clientPromise;
        const db = client.db('wilma-portfolio');
        const userCollection = db.collection('users');
        const fetchedUser = await userCollection.findOne({ id: token.id }).then((res: any) => {
          if (res) {
            session.user = res;
          }
        });

        //If user decides to create an account.
        // session.user.username = token.username;

        // session.user.id = token.id;

        // session.user.admin = token.admin;
        return session;
      },
    },
  });
}

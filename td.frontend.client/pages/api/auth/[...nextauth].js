import NextAuth from 'next-auth';
import axios from 'axios';
import CredentialsProvider from "next-auth/providers/credentials";


const apiServer = process.env.API_SERVER;

export default NextAuth({
  // We can configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Code',
      // The credentials are used to generate a suitable form on the sign in page.
      // Maybe later specify others like code, password, etc.
      credentials: {
        code: { label: "Code", type: "text", placeholder: "Type your code here" }
      },
      // The authorize method is used to validate the user's code and return a user object.
      // We use the axios library to make a request to your express server and check the code.
      // If the code is valid, return the user object (e.g. { id, name, email }).
      // If the code is invalid, return null or false.
      authorize: async (credentials) => {
        try {
          console.log(`${apiServer}/api/verify-code`)
          const { data } = await axios.post(`${apiServer}/api/verify-code`, {
            code: credentials.code
          })
          if (data.user) {
            return data.user
          } else {
            return null
          }
        } catch (error) {
          console.error(error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  // Database is not implemented now, but required to persist accounts
  //database: process.env.DATABASE_URL,
})


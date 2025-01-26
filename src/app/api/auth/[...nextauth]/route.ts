import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// user: {
//   id: '1494965825123794948',
//   name: 'Satyam Mishra',
//   email: undefined,
//   image: 'https://pbs.twimg.com/profile_images/1844244148657979394/G16RQS0y_normal.jpg'
// },
// account: {
//   provider: 'twitter',
//   type: 'oauth',
//   providerAccountId: '1494965825123794948',
//   token_type: 'bearer',
//   expires_at: 1737832615,
//   access_token: 'cFdrNHRrR3Q3N1N1UjZZZWphN1BSR1lLcE05YWk5Wnl0LUZIUjJGS1RjRkFzOjE3Mzc4MjU0MTUxNzM6MTowOmF0OjE',
//   scope: 'users.read tweet.read offline.access',
//   refresh_token: 'YkNhR1VVU0N5MWtIWWY4TzV0VDJ1TllySlN0UlNkbGxleGh3VE12R3lrZG9uOjE3Mzc4MjU0MTUxNzM6MTowOnJ0OjE'
// },
// profile: {
//   data: {
//     profile_image_url: 'https://pbs.twimg.com/profile_images/1844244148657979394/G16RQS0y_normal.jpg',
//     username: 'Satyam_Mis',
//     id: '1494965825123794948',
//     name: 'Satyam Mishra'
//   }
// }

// const handler = NextAuth({
//   providers: [
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID as string,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
//       version: "2.0", // opt-in to Twitter OAuth 2.0
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   callbacks: {
//     async jwt({ token, user, account }) {
//       console.log("token", token)
//       console.log("user", user)
//       // Initial sign in

//       if (account && user) {
//         return {
//           ...token,
//           userId: user.id,
//           twitterUsername: (user as any).twitterUsername,
//         }
//       }
//       // Return previous token if the access token has not expired yet
//       return token
//     },
//     async session({ session, token }) {
//       console.log("session", session)

//       // Send properties to the client, like an access_token and user id from a provider.
//       session.user.id = token.userId
//       session.user.twitterUsername = token.twitterUsername

//       return session
//     },
//     async signIn({ user, account, profile, }) {

//         console.log("user", user)
//         console.log("account", account)
//         console.log("profile", profile)
//       if (account && account.provider === "twitter") {
//         const client = await clientPromise
//         const db = client.db()
//         const userCollection = db.collection("userData")

//         const existingUser = await userCollection.findOne({ twitterUsername: profile.data.username })
//         console.log("existingUser", existingUser)

//         if (!existingUser) {
//           await userCollection.insertOne({
//             email: user.email,
//             name: user.name,
//             image: user.image,
//             twitterUsername: profile.data.username,
//             createdAt: new Date(),
//             lastLogin: new Date(),
//           })
//         } else {
//           await userCollection.updateOne({ twitterUsername: profile.data.username }, { $set: { lastLogin: new Date() } })
//         }
//       }
//       return true
//     },
//     async redirect({ url, baseUrl }) {
//       console.log("url", baseUrl )
//       return baseUrl
//     },
//   },
//   pages: {
//     signIn: "/auth",
//   },
// })

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "twitter") {
        const client = await clientPromise;
        const db = client.db();
        const userCollection = db.collection("userData");

        const existingUser = await userCollection.findOne({
          twitterUsername: profile?.data?.username,
        });
        console.log("existingUser", existingUser);

        if (!existingUser) {
          await userCollection.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            twitterUsername: profile?.data?.username,
            createdAt: new Date(),
            lastLogin: new Date(),
          });
        } else {
          await userCollection.updateOne(
            { twitterUsername: profile?.data.username },
            { $set: { lastLogin: new Date() } }
          );
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      console.log("JWT callback called", { token, account, profile });
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session callback called", { session, token, user });
      // session.accessToken = token.accessToken as string
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback called", { url, baseUrl });
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

//

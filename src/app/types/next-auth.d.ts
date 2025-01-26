// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string | null | undefined;
    image: string;
  }

  interface Account {
    provider: string;
    type: string;
    providerAccountId: string;
    token_type: string;
    expires_at: number;
    access_token: string;
    scope: string;
    refresh_token: string;
  }

  interface Profile {
    data: {
      profile_image_url: string;
      username: string;
      id: string;
      name: string;
    };
  }
}

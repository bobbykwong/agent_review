import jsonwebtoken from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GIS_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET as string;
const GIS_CLIENT_ID = process.env.NEXT_PUBLIC_GIS_CLIENT_ID as string;

export const jwt = {
  sign: (data: any) =>
    jsonwebtoken.sign(
      {
        data,
      },
      JWT_SECRET,
      {
        expiresIn: "1y",
      }
    ),
  verify: (jwt: string) => jsonwebtoken.verify(jwt, JWT_SECRET),
  verifyGoogle: async (googleIdToken: string) => {
    // raises error if invalid token
    await client.verifyIdToken({
      idToken: googleIdToken,
      audience: GIS_CLIENT_ID,
    });
    return;
  },
  decode: (jwt: string) => jsonwebtoken.decode(jwt),
  getUserId: (jwt: string) => {
    const decoded = jsonwebtoken.decode(jwt) as { data: { userId: string } };
    return decoded.data.userId;
  },
};

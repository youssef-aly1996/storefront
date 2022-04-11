import { PassportStatic } from "passport";
// import { Request, Response, NextFunction } from "express";
import { Profile, Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID as string,
  CLIENT_SECRET: process.env.CLIENT_SECRET as string,
};

function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: Function
) {
  console.log(profile);
  done(null, profile);
}

export function authenticate(passport: PassportStatic) {
  passport.use(
    new Strategy(
      {
        callbackURL: "/users/auth/google/callback",
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
      },
      verifyCallback
    )
  );
}

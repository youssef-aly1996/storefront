import { Request, Response, Router } from "express";
import passport from "passport";
import { Profile, Strategy } from "passport-google-oauth20";
import cookieSession from "cookie-session";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

import { User, UserStore } from "../models/user/user";
import { validateAuth } from "../middlewares/auth";
import { isLoggedIn } from "../middlewares/checkLoggedIn";

dotenv.config();

const userRouter = Router();

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
  console.log(accessToken);
  done(null, profile);
}

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
passport.serializeUser((user, done) => {
  done(user as User);
});
passport.deserializeUser((obj, done) => {
  done(null, obj as Express.User);
});

userRouter.use(passport.initialize());
userRouter.use(passport.session());

const store: UserStore = new UserStore();
const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const token = await store.createUser(user);
    req.session.token = token;
    const stringToken = verify(req.session.token, process.env.TOKEN_SECRET);
    console.log(stringToken);
    res.status(201).json(token);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const show = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const user: User = await store.getUserById(+id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await store.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const root = (req: Request, res: Response) => {
  res.status(200).json("hello my lovely user");
};

userRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/users",
    session: true,
  }),
  (req: Request, res: Response) => {
    console.log("Google called us back!");
  }
);
userRouter.get("/logout", (req: Request, res: Response) => {
  req.logOut();
  return res.redirect("/");
});
userRouter.get("/failure", function (req: Request, res: Response) {
  res.send("failed to authenticate");
});
userRouter.get("/secret", isLoggedIn, function (req: Request, res: Response) {
  res.send("fuck this is secret");
});

userRouter.get("/", root);
userRouter.post("/signup", create);
userRouter.get("/get/:id", validateAuth, show);
userRouter.get("/list", validateAuth, index);

export default userRouter;

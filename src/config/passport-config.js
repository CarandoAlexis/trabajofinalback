import passport from "passport";
import userModel from "../dao/models/user.model.js";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { githubclientID, githubclientSecret, callbackGITH } from "./config.js";

const initializePassport = () => {
  passport.use(
    "local",
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "Usuario no registrado/existente",
          });
        }

        const isPasswordValid = await isValidPasswd(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        const userData = {
          id: user._id,
          email: user.email,
        };

        return done(null, userData);
      } catch (error) {
        return done(error);
      }
    })
  );

  /*
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: githubclientID,
        clientSecret: githubclientSecret,
        callbackURL: callbackGITH,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json?.email });
          if (!user) {
            let addNewUser = {
              first_name: profile.username,
              last_name: "",
              email: profile._json?.email,
              age: 0,
              password: "",
              githubId: profile.id,
              username: profile.username,
            };
            let newUser = await userModel.create(addNewUser);
            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
*/
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;

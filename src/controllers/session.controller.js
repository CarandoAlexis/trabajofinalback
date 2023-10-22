import userModel from "../dao/models/user.model.js";
import Product from "../dao/models/products.model.js";
import { createHashValue, isValidPasswd } from "../encrypt.js";
import passport from "passport";
import CartService from "../services/carts.service.js";
import CartRepository from "../repositories/carts.repository.js";
import logger from "../config/logger.js";

class SessionController {
  async register(req, res) {
    try {
      const { first_name, last_name, email, age, password } = req.body;

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ status: "error", message: "El correo ya está en uso" });
      }

      const pswHashed = await createHashValue(password);

      const userToAdd = {
        email,
        password: pswHashed,
        first_name,
        last_name,
        age,
      };

      if (email === "adminCoder@coder.com" && password === "admin") {
        userToAdd.role = "admin";
      } else {
        userToAdd.role = "usuario";
      }

      userToAdd.last_connection = new Date();
      const newUser = await userModel.create(userToAdd);
      logger.info(`Nuevo Usuario:${newUser}`);

      if (newUser.role !== "admin") {
        await CartService.createCartForUser(newUser._id, newUser.email);
      }
      req.session.user = { email, first_name, last_name, age };
      return res.render("login");
    } catch (error) {
      logger.error("Error en el registro:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error en el registro de usuario" });
    }
  }

  async login(req, res) {
    try {
      if (req.session.user) {
        if (req.session.user.email !== req.body.email) {
          return res.status(401).json({ message: "Ya hay una sesión iniciada con otra cuenta." });
        } else {
          return res.redirect("current");
        }
      }

      const { email, password } = req.body;

      const findUser = await userModel.findOne({ email });

      if (!findUser) {
        return res
          .status(401)
          .json({ message: "Usuario no registrado/existente" });
      }

      const isPasswordValid = await isValidPasswd(password, findUser.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      findUser.last_connection = new Date();
      await findUser.save();

      req.session.user = {
        ...findUser.toObject(),
        password: "",
      };
      logger.info(`Usuario establecido en la sesión:`, req.session.user);

      return res.redirect("current");
    } catch (error) {
      logger.error("Error en el inicio de sesión", error);
      res
        .status(500)
        .json({ status: "error", message: "Error en el inicio de sesión" });
    }
  }

  async logout(req, res) {
    try {
      const userId = req.session.user.id;
      const user = await userModel.findById(userId);
      if (user) {
        user.last_connection = new Date();
        await user.save();
      }
      req.session.destroy((err) => {
        if (err) {
          logger.error("Error al cerrar sesión:", err);
          return res
            .status(500)
            .json({ status: "error", message: "Error al cerrar sesión" });
        }
        return res.redirect("/login");
      });
    } catch (error) {
      logger.error("Error en el cierre de sesión:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error en el cierre de sesión" });
    }
  }

  githubAuthentication(req, res, next) {
    return passport.authenticate("github")(req, res, next);
  }

  async githubAuthenticationCallback(req, res) {
    try {
      passport.authenticate("github", { failureRedirect: "/login" })(
        req,
        res,
        async () => {
          try {
            const githubUser = req.user;
            let findUser = await userModel.findOne({ githubId: githubUser.id });

            if (!findUser) {
              const existingUser = await userModel.findOne({
                username: githubUser.username,
              });

              if (existingUser) {
                findUser = existingUser;
              } else {
                findUser = await userModel.create({
                  githubId: githubUser.id,
                });
              }
              const existingCart = await CartRepository.findCartByUserId(
                githubUser.username
              );
              if (!existingCart) {
                await CartService.createCartForUser(
                  githubUser.username,
                  githubUser.username
                );
              }
              req.session.user = {
                ...findUser.toObject(),
                password: "",
                cartId: existingCart._id,
              };
            } else {
              const cart = await CartRepository.findCartByUserId(
                githubUser.username
              );
              if (cart) {
                req.session.user = {
                  ...findUser.toObject(),
                  password: "",
                  cartId: cart._id,
                };
              } else {
              }
            }

            if (req.session.user) {
              return res.redirect("current");
            }
            logger.info(`Usuario establecido en la sesión:`, req.session.user);
            return res.redirect("current");
          } catch (error) {
            logger.error("Error en el inicio de sesión", error);
            res
              .status(500)
              .json({
                status: "error",
                message: "Error al obtener los datos del usuario",
              });
          }
        }
      );
    } catch (error) {
      logger.error("Error en el callback de autenticación:", error);
      res
        .status(500)
        .json({
          status: "error",
          message: "Error en el callback de autenticación",
        });
    }
  }

  async getCurrentUserDTO(req, res) {
    try {
      if (req.session.user) {
        const user = await userModel.findOne({ email: req.session.user.email });

        if (user) {
          const products = await Product.find().lean();

          const userCart = await CartRepository.findCartByUserId(user._id);

          let viewName;

          if (user.role === "admin") {
            viewName = "admin-current";
          } else if (user.role === "usuario") {
            viewName = "user-current";
          } else if (user.role === "premium") {
            viewName = "premium-current";
          }

          for (const product of products) {
            product.isOwner = user.email === product.owner;
          }

          res.render(viewName, {
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            products: products,
            cartId: userCart ? userCart._id : null,
          });
        } else {
          res.status(404).json({ message: "Usuario no encontrado" });
        }
      } else {
        res
          .status(401)
          .json({ message: "No hay usuario autenticado en la sesión" });
      }
    } catch (error) {
      logger.error("Error al obtener el usuario actual:", error);
      res
        .status(500)
        .json({
          status: "error",
          message: "Error al obtener el usuario actual",
        });
    }
  }
}

export default new SessionController();

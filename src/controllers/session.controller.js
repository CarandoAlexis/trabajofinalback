import userModel from "../dao/models/user.model.js";
import Product from '../dao/models/products.model.js';
import { createHashValue, isValidPasswd } from '../encrypt.js';
import passport from "passport";
import CartService from "../services/carts.service.js"
import CartRepository from "../repositories/carts.repository.js"


class SessionController {
  async register(req, res) {
    try {
      const { first_name, last_name, email, age, password } = req.body;
  
      const pswHashed = await createHashValue(password);
  
      const userToAdd = {
        email,
        password: pswHashed,
        first_name,
        last_name,
        age,
      };
  
      // Verificar si el usuario registrado debe ser un administrador
      if (email === 'adminCoder@coder.com' && password === 'admin') {
        userToAdd.role = 'admin';
      } else {
        userToAdd.role = 'usuario';
      }
  
      const newUser = await userModel.create(userToAdd);
      console.log("newUser:", newUser);
  
      req.session.user = { email, first_name, last_name, age };
      return res.render('login');
    } catch (error) {
      console.error("Error en el registro:", error);
      res.status(500).json({ status: "error", message: "Error en el registro de usuario" });
    }
  }
  
  async login(req, res) {
    try {
      const { email, password } = req.body;
  
      const findUser = await userModel.findOne({ email });
  
      if (!findUser) {
        return res.status(401).json({ message: "Usuario no registrado/existente" });
      }
  
      const isPasswordValid = await isValidPasswd(password, findUser.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // Verifica si el usuario ya tiene un carrito
      const existingCart = await CartRepository.findCartByUserId(findUser._id);
  
      if (!existingCart) {
        // Si no hay carrito, crear uno para el usuario
        await CartService.createCartForUser(findUser._id);
      }
  
      // Establece el usuario en la sesión
      req.session.user = {
        ...findUser.toObject(),
        password: "",
      };
  
      console.log("Usuario establecido en la sesión:", req.session.user);
    
      // Redireccion a current
      return res.redirect("current");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.status(500).json({ status: "error", message: "Error en el inicio de sesión" });
    }
  }
  
  async logout(req, res) {
    try {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).json({ status: "error", message: "Error al cerrar sesión" });
          }
          return res.redirect("/login"); // Redirige a la página de inicio de sesión después del cierre de sesión exitoso
        });
      } catch (error) {
        console.error("Error en el cierre de sesión:", error);
        res.status(500).json({ status: "error", message: "Error en el cierre de sesión" });
      }
  }

  githubAuthentication(req, res, next) {
    return passport.authenticate("github")(req, res, next);
  }


  async githubAuthenticationCallback(req, res) {
    try {
        passport.authenticate("github", { failureRedirect: "/login" })(req, res, async () => {
          try {
            const githubUser = req.user;
            // Verifica si el usuario existe en la base de datos a través del githubId
            let findUser = await userModel.findOne({ githubId: githubUser.id });
            if (!findUser) {
              // Si el usuario no existe en la base de datos, crea uno nuevo con los datos de GitHub
              findUser = await userModel.create({
                githubId: githubUser.id,
                username: githubUser.username,
              });
            }
            // Establece la sesión del usuario
            req.session.user = {
              ...findUser.toObject(),
              password: "",
            };
  
            console.log("Usuario establecido en la sesión:", req.session.user);
  
            // Para obtener todos los productos
            const products = await Product.find().lean();
  
            // Renderiza la vista de perfil con los datos del usuario y los productos
            return res.render("profile", {
              role: findUser.role,
              username: findUser.username,
              products,
            });
          } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            res.status(500).json({ status: "error", message: "Error al obtener los datos del usuario" });
          }
        });
      } catch (error) {
        console.error("Error en el callback de autenticación:", error);
        res.status(500).json({ status: "error", message: "Error en el callback de autenticación" });
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
  
          if (user.role === 'admin') {
            viewName = 'admin-current';
          } else if (user.role === 'usuario') {
            viewName = 'user-current';
          }
  
          res.render(viewName, { 
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            products: products,
            cartId: userCart ? userCart._id : null
          });
        } else {
          res.status(404).json({ message: "Usuario no encontrado" });
        }
      } else {
        res.status(401).json({ message: "No hay usuario autenticado en la sesión" });
      }
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      res.status(500).json({ status: "error", message: "Error al obtener el usuario actual" });
    }
  }

}


export default new SessionController();
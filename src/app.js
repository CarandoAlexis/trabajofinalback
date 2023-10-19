import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import displayRoutes from "express-routemap";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionRouter from "./routes/session.router.js";
import authMdw from "./middleware/auth.middleware.js";
import mongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import { mongoUrl, sessionSecret } from "./config/config.js";
import cartRouter from "./routes/carts.router.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./config/logger.js";
import loggerTestRouter from './routes/loggerTest.router.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import swaggerOpts from "./config/swagger.config.js";

console.log("Mongo URL app.js:", mongoUrl);

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerOpts);

// Configuración de conexión a MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Configuración de la sesión
app.use(
  session({
    store: mongoStore.create({
      mongoUrl, 
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60 * 3600,
    }),
    secret: sessionSecret, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, 
    },
  })
);

// Inicialización de Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rutas
app.use("/", viewsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productsRouter);
app.use("/api/session/", sessionRouter);
app.use("/loggerTest", loggerTestRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redirección a la página de registro por defecto
app.get("/", (req, res) => {
  res.redirect("/register");
});

// Ruta protegida para la lista de productos
app.use("/products", authMdw, (req, res, next) => {
  return res.render("productList");
});

app.use(errorHandler);

// Iniciar el servidor
const mode = process.env.NODE_ENV || "development";
const port = mode === "development" ? 8080 : 3000;
app.listen(port, () => {
  displayRoutes(app);
  //console.log(`Server listening on port ${port}`);
  logger.info(`Server listening on port ${port}`);
});
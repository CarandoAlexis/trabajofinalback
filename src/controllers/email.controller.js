import nodemailer from "nodemailer";
import { emailUser, emailPassword } from "../config/config.js";
import logger from "../config/logger.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${emailUser}`,
    pass: `${emailPassword}`,
  },
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "alexiscarando@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error("Error al enviar el correo", error);
    } else {
      logger.info("Correo electrónico enviado", info.response);
    }
  });
};

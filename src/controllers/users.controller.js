import UserModel from "../dao/models/user.model.js";
import path from "path";
import { sendEmail } from "./email.controller.js";
import CartModel from "../dao/models/carts.model.js";
import logger from "../config/logger.js";

export const changeUserRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.role === "premium") {
      user.role = "usuario";
      await user.save();

      return res.json({
        message: "Usuario actualizado a usuario con éxito",
        updatedUser: user,
      });
    }

    const hasIdentificationImage = user.documents.some(
      (doc) => doc.name === "Identificacion"
    );

    if (!hasIdentificationImage) {
      return res
        .status(400)
        .json({
          message:
            "El usuario debe cargar una imagen de Identificación primero",
        });
    }

    user.role = "premium";
    await user.save();

    return res.json({
      message: "Usuario actualizado a premium con éxito",
      updatedUser: user,
    });
  } catch (error) {
    logger.error("Error al cambiar el rol del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const uploadIdentification = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Falta la identificación" });
    }

    user.documents.push({
      name: "Identificacion",
      reference:
        "/uploads/identificacion/Identificacion" +
        path.extname(req.file.originalname),
    });

    user.last_connection = new Date();

    await user.save();

    return res.json({
      message: "Identificación subida exitosamente",
      updatedUser: user,
    });
  } catch (error) {
    logger.error("Error al subir la identificación:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      { role: { $ne: "admin" } },
      "first_name last_name email role"
    );
    const sUsers = users.map((user) => user.toObject());
    res.render("allusers", { users: sUsers });
  } catch (error) {
    logger.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    const currentTime = new Date();
    const twentySecondsAgo = new Date(currentTime);
    twentySecondsAgo.setSeconds(currentTime.getSeconds() - 20);

    const inactiveUsers = await UserModel.find({
      last_connection: { $lt: twentySecondsAgo },
      role: { $ne: "admin" },
    });

    for (const user of inactiveUsers) {
      const email = user.email;
      const subject = "Eliminación de cuenta por inactividad";
      const text =
        "Tu cuenta ha sido eliminada por inactividad. Si deseas recuperarla, contáctanos.";

      await CartModel.deleteOne({ name: user._id.toString() });

      await sendEmail(email, subject, text);

      await UserModel.findByIdAndDelete(user._id);
    }

    return res.json({ message: "Usuarios inactivos eliminados con éxito" });
  } catch (error) {
    logger.error("Error al eliminar usuarios inactivos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await CartModel.deleteOne({ name: user._id.toString() });

    const deletedUser = await UserModel.findByIdAndDelete(uid);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    logger.error("Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { newRole } = req.body;

    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (newRole !== "usuario" && newRole !== "premium") {
      return res
        .status(400)
        .json({ message: 'Rol no válido. Debe ser "usuario" o "premium".' });
    }

    user.role = newRole;
    await user.save();

    return res.json({
      message: `Rol de usuario actualizado a ${newRole}`,
      updatedUser: user,
    });
  } catch (error) {
    logger.error("Error al actualizar el rol del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

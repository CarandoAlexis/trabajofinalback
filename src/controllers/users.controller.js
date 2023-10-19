import UserModel from '../dao/models/user.model.js';
import path from 'path';

export const changeUserRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.role === 'premium') {
      // Cambiar el rol del usuario a "usuario" sin verificar documentos
      user.role = 'usuario';
      await user.save();

      return res.json({ message: 'Usuario actualizado a usuario con éxito', updatedUser: user });
    }

    // Verificar si el usuario ya ha cargado una imagen de "Identificación" en cualquier formato
    const hasIdentificationImage = user.documents.some(doc => doc.name === 'Identificacion');

    if (!hasIdentificationImage) {
      return res.status(400).json({ message: 'El usuario debe cargar una imagen de Identificación primero' });
    }

    // Cambiar el rol del usuario a "premium"
    user.role = 'premium';
    await user.save();

    return res.json({ message: 'Usuario actualizado a premium con éxito', updatedUser: user });
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const uploadIdentification = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Falta la identificación' });
    }

    user.documents.push({
      name: 'Identificacion',
      reference: '/uploads/identificacion/Identificacion' + path.extname(req.file.originalname),
    });

    user.last_connection = new Date();

    await user.save();

    return res.json({
      message: 'Identificación subida exitosamente',
      updatedUser: user,
    });
  } catch (error) {
    console.error('Error al subir la identificación:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
import UserModel from '../dao/models/user.model.js';

// Controlador para cambiar el rol del usuario a premium o viceversa
export const changeUserRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findOne({ _id: uid });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Cambiar el rol del usuario
    user.role = user.role === 'usuario' ? 'premium' : 'usuario';
    await user.save();

    return res.json({ message: 'Rol de usuario actualizado con éxito', updatedUser: user });
  } catch (error) {
    console.error('Error al cambiar el rol del usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

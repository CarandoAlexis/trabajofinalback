import express from 'express';
import { changeUserRole } from '../controllers/users.controller.js';

const router = express.Router();

// Ruta para cambiar el rol de usuario a premium o viceversa
router.put('/premium/:uid', changeUserRole);

export default router;

import express from 'express';
import { changeUserRole , uploadIdentification } from '../controllers/users.controller.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

// Ruta para cambiar el rol de usuario a premium o viceversa
router.put('/premium/:uid', changeUserRole);
router.post('/:uid/identificacion', upload.single('identificacion'),uploadIdentification);

export default router;

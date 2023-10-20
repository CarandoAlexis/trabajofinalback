import express from 'express';
import { changeUserRole , uploadIdentification , getAllUsers } from '../controllers/users.controller.js';
import upload from '../middleware/multer.middleware.js';
import { checkUserRole , checkPremiumRole} from "../middleware/role.middleware.js";
import authMdw from "../middleware/auth.middleware.js";

const router = express.Router();

// Ruta para cambiar el rol de usuario a premium o viceversa
router.get('/allusers',authMdw ,checkPremiumRole, checkUserRole, getAllUsers)
router.put('/premium/:uid', changeUserRole);
router.post('/:uid/identificacion', upload.single('identificacion'),uploadIdentification);

export default router;

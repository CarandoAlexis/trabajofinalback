import express from 'express';
import { updateUser, changeUserRole , uploadIdentification , getAllUsers , deleteInactiveUsers , deleteUser} from '../controllers/users.controller.js';
import upload from '../middleware/multer.middleware.js';
import { checkUserRole , checkPremiumRole} from "../middleware/role.middleware.js";
import authMdw from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/allusers', authMdw, checkPremiumRole, checkUserRole, getAllUsers);
router.put('/:uid', authMdw, checkPremiumRole, checkUserRole ,updateUser);
router.put('/premium/:uid', changeUserRole);
router.post('/:uid/identificacion', upload.single('identificacion'),uploadIdentification);
router.delete("/", deleteInactiveUsers);
router.delete('/:uid', authMdw, checkUserRole , checkPremiumRole , deleteUser);

export default router;

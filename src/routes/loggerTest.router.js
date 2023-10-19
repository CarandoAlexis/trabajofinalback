import { Router } from "express";
import logger from "../config/logger.js";

const router = Router();

router.get('/', (req, res) => {
  logger.debug('Mensaje de depuración (debug)');
  logger.http('Mensaje HTTP (http)');
  logger.info('Menssaje de información (info)');
  logger.warning('Mensaje de advertencia (warning)');
  logger.error('Mensaje de error (error)');
  logger.fatal('Mensaje de fatal (fatal)');

  res.status(200).json({ message: 'Prueba de registro de eventos completada' });
});

export default router;
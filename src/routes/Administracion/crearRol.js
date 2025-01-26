import express from 'express'
const router = express.Router();
import {rolesController} from '../../Controllers/Roles/actualizarRolControlador.js';

router.post('/', rolesController.crearRol);

export {router};
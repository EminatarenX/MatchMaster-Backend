import { Router } from 'express';
import UsuarioController from '../controllers/Usuario.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = Router();

router.post('/', UsuarioController.registrarUsuario)
router.get('/confirmar/:id', UsuarioController.confirmarUsuario)
router.post('/login', UsuarioController.iniciarSesion)
router.get('/perfil', checkAuth, UsuarioController.perfil)
router.post('/recuperar-password', UsuarioController.cambiarPassword)
router.put('/recuperar-password/:token', UsuarioController.actualizarPassword)


export default router
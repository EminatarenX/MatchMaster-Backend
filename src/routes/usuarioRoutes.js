import { Router } from 'express';
import UsuarioController from '../controllers/Usuario.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = Router();

router.post('/', UsuarioController.registrarUsuario)
router.get('/:id', UsuarioController.confirmarUsuario )
router.post('/login', UsuarioController.iniciarSesion)
router.get('/perfil', checkAuth, UsuarioController.perfil)


export default router
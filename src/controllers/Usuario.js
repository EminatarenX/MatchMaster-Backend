import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generarId } from '../helpers/generarId.js';
import { generarJWT } from '../helpers/generarJTW.js'
import { emailRegistro, emailRecuperarPassword } from '../helpers/emails.js'

const prisma = new PrismaClient();

const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {

    const usuario = await prisma.usuario.findFirst({
      where: {
        email
      }
    })

  

    if(usuario){
      const error = new Error('El usuario ya existe')
      return res.status(400).json({mensaje: error.message})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = generarId()

    emailRegistro({email, nombre, token}) 

    const usuarioCreado = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        token
      }
    })

    res.status(201).json({mensaje: 'Usuario creado', usuario: usuarioCreado})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mensaje: 'Hubo un error'})
  }finally{
    await prisma.$disconnect()
  }
}

const confirmarUsuario = async (req, res) => {
  const { id } = req.params;

  try {

    const existeUsuario = await prisma.usuario.findFirst({
      where: {
        id
      }
    })

    if(!existeUsuario){
      const error = new Error('El usuario no existe')
      return res.status(400).json({mensaje: error.message})
    }

    if(existeUsuario.confirmado){
      const error = new Error('El usuario ya está confirmado')
      return res.status(400).json({mensaje: error.message})
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id
      },
      data: {
        confirmado: true,
        token: ''
      }
    })

    return res.status(200).json({mensaje: 'Usuario confirmado!', usuario: usuarioActualizado})
    
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({mensaje: 'Hubo un error'})

  }finally{
    await prisma.$disconnect()
  }
}

const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {

    const existeUsuario = await prisma.usuario.findUnique({
      where: {
        email
      }
    })


    if(!existeUsuario){
      const error = new Error("El usuario no existe")
      return res.status(400).json({mensaje: error.message})
    }

    if(!existeUsuario.confirmado){
      const error = new Error("El usuario no está confirmado")
      return res.status(400).json({mensaje: error.message})
    }

    const passwordValido = await bcrypt.compare(password, existeUsuario.password)
    if(!passwordValido){
      const error = new Error("Contraseña incorrecta")
      return res.status(400).json({mensaje: error.message})
    }

    const token = generarJWT(existeUsuario.id)

    return res.status(200).json({mensaje: 'Bienvenido', usuario: existeUsuario.nombre, token})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({ mensaje: 'Hubo un error'})
  }finally {
    await prisma.$disconnect()
  }
}

const perfil = async (req, res) => {
  const {usuario} = req

  return res.json(usuario)
}

const cambiarPassword = async (req, res) => {
  const { email } = req.body;

  try {
    
    const existeUsuario = await prisma.usuario.findFirst({
      where: {
        email
      }
    })

    if(!existeUsuario){
      const error = new Error('El usuario no existe')
      return res.status(400).json({mensaje: error.message})
    }

    const token = generarId()

    const usuarioActualizado = await prisma.usuario.update({
      where: {
        email
      },
      data: {
        token
      }
    })

    emailRecuperarPassword({email, nombre: existeUsuario.nombre, token})

    return res.status(200).json({mensaje: 'Se envió un email para recuperar la contraseña'})

    
  } catch (error) {
    console.log(error)
    const err = new Error('Hubo un error')
    return res.status(400).json({mensaje: err.message})
  }finally{
    await prisma.$disconnect()
  }
}

const actualizarPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const existeUsuario = await prisma.usuario.findFirst({
      where: {
        token
      }
    })

    if(!existeUsuario){
      const error = new Error('El token de ingreso no es valido')
      return res.status(401).json({mensaje: error.message})
    }

    const salt = await bcrypt.genSalt(10)

    const newPassword = await bcrypt.hash(password, salt)

    await prisma.usuario.update({
      where: {
        id: existeUsuario.id
      },
      data: {
        password: newPassword,
        token: ''
      }
    })

    return res.status(200).json({mensaje: 'Your password has been updated'})
  } catch (error) {
    console.log(error),
     res.status(400).json({mensaje: 'Something went wrong'})

  }finally{
    await prisma.$disconnect()
  }

}

export default {
  registrarUsuario,
  iniciarSesion,
  confirmarUsuario,
  perfil,
  cambiarPassword,
  actualizarPassword
}
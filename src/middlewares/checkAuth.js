import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config();

const prisma = new PrismaClient();

const checkAuth = async(req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)


      const usuario = await prisma.usuario.findFirst({
        where: {
          id: decoded.id
        }
      })

      req.usuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      }
      
      
      return next()

    } catch (error) {
      return res.status(404).json({mensaje: 'Hubo un error'})

    }finally{
      await prisma.$disconnect()
    }

  }

  if(!token){
    const error = new Error('Token no valido')
    res.status(401).json({mensaje: error.message})
  }

  next()
};

export default checkAuth;
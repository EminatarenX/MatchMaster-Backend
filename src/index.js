import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js'

config();
const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/usuarios', usuarioRoutes) 


const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
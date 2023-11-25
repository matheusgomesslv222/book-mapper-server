//import { openDb } from './dataBase/configDb.js';
//import { createTable , insertUsuario } from './dataBase/Controller/User.js';
import express from 'express';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());

import router from './routes.js'
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('servidor on'))
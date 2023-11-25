import { openDb } from "../configDb.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// export async function createTable(){
//     openDb().then(db=>{
//         db.exec(
//             'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, sobrenome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL, numero_telefone TEXT NOT NULL)'
//         )
//     })
// }

export async function insertUsuario(usuario){
     usuario = usuario.body
    console.log(usuario)
    await openDb().then(db =>{
         db.run('INSERT INTO User (nome , sobrenome , email , numero_telefone, senha) VALUES (?, ?, ?, ?, ?)', [usuario.nome , usuario.sobrenome, usuario.email, usuario.numero_telefone, usuario.senha]);
    })
}

const secretKey = crypto.randomBytes(32).toString('hex');

export async function authUser(req, res){
    const usuario = {
        email : req.body.email,
        senha : req.body.senha
    }
    console.log(usuario)
    await openDb().then(db=>{
        db.get('SELECT * FROM User WHERE email=? AND senha=?', [usuario.email , usuario.senha])
        .then(row => {
            if(row){
                console.log('Usuario Autheticado')
                const token = jwt.sign({ email: usuario.email }, secretKey, { expiresIn: '1h' });

                res.status(200).json({message: 'Auth bem-sucedida', token});
            }else {
                res.status(401).json({message: 'Credenciais invalidas'})
            }
        })
        .catch(err =>{
            console.error(err);
            res.status(500).json({message:"Erro interno no servidor"})
        })
    });
 }
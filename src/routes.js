import { Router } from "express";
import { insertUsuario , authUser } from './dataBase/Controller/User.js';
import { newEstante , estantes, adicionarLivroEstante ,livrosEstante ,deletarLivro} from './dataBase/Controller/Estante.js';

const router = Router();

router.get('/', (req,res) => {
    res.json({
        'statusCode': 200,
        "msg": 'API Rodando'
    });
});

router.post('/login', authUser);
router.post('/cadastro', insertUsuario);

router.post('/estante', newEstante);
router.post('/adicionarLivroAEstante', adicionarLivroEstante);


router.get('/estantes', estantes);
// Rota para buscar livros de uma estante específica
router.get('/livrosEstante/:estanteID', livrosEstante);

router.delete('/deletarLivro/:livroId', deletarLivro);
export default router;
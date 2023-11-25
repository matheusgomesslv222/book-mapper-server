import { openDb } from "../configDb.js";

export async function newEstante(req, res) {
  console.log(req.body)
    const { nome } = req.body;
  
    try {
      const estanteExistente = await checkIfShelfExists(nome);
  
      if (estanteExistente) {
        console.log('Estante já existe');
        return res.status(400).json({ message: 'Estante com nome já existente' });
      }
  
      await createShelf(nome);
  
      res.status(201).json({ message: 'Estante criada com sucesso.' });
      console.log('Estante criada');
    } catch (error) {
      console.error('Erro ao criar estante:', error);
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
  
  async function checkIfShelfExists(nome) {
    const db = await openDb();
    const estante = await db.get('SELECT * FROM Estante WHERE NomeEstante = ?', [nome]);
    return estante !== undefined;
  }
  
  async function createShelf(nome) {
    const db = await openDb();
    await db.run('INSERT INTO Estante (NomeEstante) VALUES (?)', [nome]);
  }

export async function estantes (req, res){
    try {
      const db = await openDb();
      const estantes = await db.all('SELECT * FROM Estante');
      res.status(200).json(estantes);
    } catch (error) {
      console.error('Erro ao buscar estantes:', error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  export async function adicionarLivroEstante(req, res) {
    const { livro, estanteID } = req.body;
    console.log('seu livro: ', livro.volumeInfo.title);
    const Titulo = livro.volumeInfo.title
    const Autor = livro.volumeInfo.authors[0]
    const Descricao = livro.volumeInfo.description
    const livroCod = livro.id;
    const img = livro.volumeInfo.imageLinks.thumbnail;

    console.log('SEU ID: ',estanteID)
    const db = await openDb();
    try {
        // Inserir o livro na tabela de livros
        const result = await db.run(
            'INSERT INTO Livro (Titulo , Autor, Descricao, EstanteID, livroCod, img ) VALUES (?, ?, ?, ?, ?, ?)',
            [Titulo, Autor,Descricao, estanteID , livroCod, img]
        );

        // Verificar se a inserção foi bem-sucedida
        if (result.changes > 0) {
            return { success: true, message: 'Livro adicionado com sucesso à estante.' };
        } else {
            return { success: false, message: 'Falha ao adicionar o livro à estante.' };
        }
    } catch (error) {
        console.error('Erro ao adicionar livro à estante:', error);
        return { success: false, message: 'Erro interno no servidor.' };
    }
}

export async function livrosEstante(req, res) {
  
  const { estanteID } = req.params; // Obtenha o parâmetro estanteID da URL
  try {
    const db = await openDb();
    const livros = await db.all('SELECT * FROM Livro WHERE EstanteID = ?', [estanteID]);
    res.status(200).json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros da estante:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}


export async function deletarLivro(req, res) {
  const { livroId } = req.params;

  try {
    const db = await openDb();

    // Lógica para deletar o livro com base no ID
    const result = await db.run('DELETE FROM Livro WHERE LivroID = ?', [livroId]);

    // Verificar se a exclusão foi bem-sucedida
    if (result.changes > 0) {
      res.status(200).json({ success: true, message: 'Livro deletado com sucesso.' });
    } else {
      res.status(404).json({ success: false, message: 'Livro não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
}
# API de Gerenciamento de Biblioteca

Bem-vindo à API de Gerenciamento de Biblioteca! Esta API permite o gerenciamento de estantes e livros em uma biblioteca.

## Instalação

Para começar, siga estas instruções para instalar e configurar a API em seu ambiente local:

1. Clone este repositório para o seu ambiente local:

   ```bash
   git clone https://github.com/matheusgomesslv222/book-mapper-server.git
   cd sua-api-de-biblioteca

2.Instale as dependências necessárias:

    npm install

3.Inicie o servidor :

    npm run dev

## Endpoints
A seguir estão os principais endpoints disponíveis na API:

### 1. Criar Nova Estante
Endpoint: POST /api/newEstante
Descrição: Cria uma nova estante na biblioteca.
Parâmetros:
    nome (string): Nome da nova estante.#

Exemplo de uso :

    curl -X POST -H "Content-Type: application/json" -d '{"nome": "Minha Estante"}' http://localhost:seu-porta/api/newEstante

### 2. Obter Todas as Estantes
Endpoint: GET /api/estantes
Descrição: Retorna todas as estantes existentes na biblioteca.

Exemplo de uso :

    curl http://localhost:seu-porta/api/estantes

### 3. Adicionar Livro a uma Estante
Endpoint: POST /api/adicionarLivroEstante
Descrição: Adiciona um novo livro a uma estante específica.
Parâmetros:
livro (objeto): Informações sobre o livro a ser adicionado.
estanteID (string): ID da estante à qual o livro será adicionado.

Exemplo de uso:

    curl -X POST -H "Content-Type: application/json" -d '{"livro": {"volumeInfo": {"title": "Nome do Livro", "authors": ["Autor do Livro"], "description": "Descrição do Livro", "id": "ID-do-Livro", "imageLinks": {"thumbnail": "URL-da-Imagem"}}}, "estanteID": "ID-da-Estante"}' http://localhost:seu-porta/api/adicionarLivroEstante

### 4. Obter Livros de uma Estante
Endpoint: GET /api/livrosEstante/:estanteID
Descrição: Retorna todos os livros de uma estante específica.
Parâmetros:
estanteID (string): ID da estante da qual deseja obter os livros.

Exemplo de uso:

    curl http://localhost:seu-porta/api/livrosEstante/ID-da-Estante

### 5. Deletar Livro
Endpoint: DELETE /api/deletarLivro/:livroId
Descrição: Deleta um livro específico com base no ID.
Parâmetros:
livroId (string): ID do livro a ser deletado.
Exemplo de uso:

    curl -X DELETE http://localhost:seu-porta/api/deletarLivro/ID-do-Livro








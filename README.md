# Projeto de Reservas de Quartos

Para o desenvolvimento deste projeto, foi utilizado o framework Next.js para o frontend e o framework Nest.js para o backend. O banco de dados utilizado foi o MySQL.

Juntamente com o Nest.js, foi utilizado o TypeORM para a conexão com o banco de dados e a criação das tabelas.

Para o gerenciamento de estados, foi utilizado o Redux.

Segue abaixo as instruções para execução do projeto.

## Passo 1: Configurar banco de dados

Para configurar o banco de dados, você deve criar um arquivo chamado `.env` na raiz da pasta `server` e preencher as variáveis de ambiente conforme o exemplo abaixo:

```env
DB_NAME=api
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=student
DB_PASSWORD=student
```

OBS: O banco de dados deve ser criado manualmente, e o usuário e senha devem ter permissões de leitura e escrita. Não é necessário criar as tabelas, pois o projeto irá criá-las automaticamente.

## Passo 2: Instalar dependências

Para instalar as dependências do projeto, execute os comandos abaixo:

```bash
cd server
npm install
```

```bash
cd client
npm install
```

## Passo 3: Executar o projeto

Para executar o projeto, execute os comandos abaixo:

```bash
cd server
npm run build
npm start
```

```bash
cd client
npm run build
npm start
```

## Passo 4: Acessar o projeto

Após executar os comandos acima, acesse o projeto através do endereço `http://localhost:3000`.

A página inicial exibirá uma lista de quartos cadastrados no banco de dados. Para cadastrar um novo quarto, clique no botão "Adicionar quarto" no canto superior direito. Você será redirecionado para a página de cadastro de quartos, onde poderá preencher os campos e salvar o quarto.

Caso queira editar ou excluir um quarto, clique no ícone de lápis ou lixeira ao lado do quarto desejado.

A visualização das reservas é feita através do ícone de olho, o que te redirecionará para a página de reservas do quarto selecionado. Nessa página, você poderá visualizar as reservas já cadastradas, podendo excluí-las ou editá-las. Para cadastrar uma nova reserva, volte a página principal e clique no botão "Reservar" ao lado do quarto desejado.

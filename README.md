# Community - Plataforma de interatividade

O Community é uma aplicação de interatividade em um formato semelhante a um blog, onde os usuários podem compartilhar conhecimento e coisas do seu interesse, além de poder interagir na seção de comentários de cada post.
<br /><br />

<p align="center">
    <a href="#demonstracao">Demonstração da aplicação</a> •
    <a href="#backend">Back-end</a> •
    <a href="#frontend">Front-end</a> •
    <a href="#pre-requisites">Pré-requisitos</a> •
    <a href="#run">Como rodar a aplicação</a> •
    <a href="#license">Licença</a> •
    <a href="#author">Autor</a>
</p>

<br />

<h1 id="demonstracao">Demonstração</h1>

- Criando conta e logando no sistema
<img src="./assets/Community_Register_Login.gif" alt="Gif demonstrando a criação de uma conta e logando no sistema" />

<br />

- Atualizando dados de usuário e definindo imagem de perfil
<img src="./assets/Community_UpdateProfile.gif" alt="Gif demonstrando a atualização dos dados do usuário" />

<br />

- Criando um post
<img src="./assets/Community_Criacao_Post.gif" alt="Gif demonstrando o processo de criação de um post" />

<br />

- Editando e deletando um post
<img src="./assets/Community_Edicao_Delecao_Post.gif" alt="Gif demonstrando o processo de edição e deleção de um post" />

<br />

- Dando like, dislike e salvando o post como favorito
<img src="./assets/Community_Like_Dislike_Favorito.gif" alt="Gif demonstrando as funções de dar like, dislike e salvar o post como favorito" />

<br />

- Adicionando e excluindo comentários em um post
<img src="./assets/Community_Comentario.gif" alt="Gif demonstrando o processo de inserção e deleção de comentários em um post" />

<br />

- Buscando posts pelo título ou pela tag
<img src="./assets/Community_Pesquisa.gif" alt="Gif demonstrando a busca de posts pelo título ou pela tag" />

<br />

- Layout responsivo
<img src="./assets/Community_Responsividade1.gif" alt="Gif demonstrando o layout responsivo da aplicação" />
<br /><br />
<img src="./assets/Community_Responsividade2.gif" alt="Gif demonstrando o layout responsivo da aplicação" />

<br />

<h1 id="backend">Back-end</h1>
Esta aplicação é uma API REST desenvolvida em NodeJS, em conjunto com o framework Express JS e o banco de dados MongoDB. Para autenticação, foi utilizado a biblioteca JSON Web Token (JWT), e bcryptjs para criptografia dos dados. Para o upload de imagens, foi utilizado a biblioteca Multer, e bibliotecas como o Morgan e Winston para criar e registar logs do sistema.
<br /><br />

## 💻 Tecnologias utilizadas
As seguintes ferramentas foram utilizadas na construção do projeto:
- [Typescript](https://www.typescriptlang.org/)
- [Node Js](https://nodejs.org/en)
- [Express Js](https://expressjs.com/pt-br/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Multer](https://github.com/expressjs/multer)
- [Morgan](https://github.com/expressjs/morgan)
- [Winston](https://github.com/winstonjs/winston)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)

## 🚀 Funções/Recursos
Principais funções e recursos da aplicação:
- **Autenticação:** autenticação de usuário com [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken).
- **Upload e armazenamento de imagens:** upload de imagens utilizando a biblioteca [Multer](https://github.com/expressjs/multer), e armazenamento utilizando o [módulo fs](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html) do Node Js.
- **Logs do sistema:** sistema de registro de logs com o [Morgan](https://github.com/expressjs/morgan) e [Winston](https://github.com/winstonjs/winston), para monitorar de maneira mais clara o funcionamento da aplicação.
- **Validação:** validação dos dados vindos da requisição com [class-validator](https://github.com/typestack/class-validator) e [class-transformer](https://github.com/typestack/class-transformer).
- **Armazenamento:** armazenamento dos dados em nuvem com o serviço [MongoDB Atlas](https://www.mongodb.com/atlas/database).

<h1 id="frontend">Front-end</h1>
Esta aplicação é a interface da plataforma Community construída em ReactJS e Redux. Através desta aplicação, cada usuário poderá criar sua conta, criar posts e interagir na plataforma.
<br /><br />

## 💻 Tecnologias utilizadas
As seguintes ferramentas foram utilizadas na construção do projeto:
- [Typescript](https://www.typescriptlang.org/) | [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [ReactJS](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/en/main)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Funções/Recursos
Principais funções e recursos da aplicação:
- **Gerenciamento de estados:** gerenciamento dos estados/requisições da aplicação através do [Redux](https://redux.js.org/) em conjunto com o [Redux Toolkit](https://redux-toolkit.js.org/), visando separar as responsabilidades de cada parte da aplicação de maneira mais eficiente e organizada.
- **Carregamento parcial das Imagens:** utilização da Web API [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) para carregar as imagens de maneira gradual, apenas quando estiverem visíveis na tela, evitando carregamentos desnecessários, melhorando a performance da aplicação e a experiência do usuário.
- **Roteamento:** rotas protegidas com base na autenticação do usuário, utilizando o [React Router](https://reactrouter.com/en/main).
- **Layout Responsivo:** layout responsivo que se adapta aos diferentes tamanhos de tela.
<br /><br />

<h1 id="pre-requisites">🛠 Pré-requisitos</h1>

- Ter uma conta no serviço MongoDB Atlas, com um cluster criado e devidamente configurado ([Configurar MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/)).
- Ter instalado o [Git](https://git-scm.com/) e o [NodeJs](https://nodejs.org/en/).

<h1 id="run"> ⚙ Como rodar a aplicação </h1>

Com o auxílio de um terminal, precisamos rodar alguns comandos para executar o projeto:
- Primeiro, clone este repositório:
    ```bash
    $ git clone https://github.com/luizfelipeapolonio/community
    ```
- Acesse a pasta da aplicação:
    ```bash
    $ cd community
    ```
- Back-end
    - Primeiro acesse a pasta `backend`:
        ```bash
        $ cd backend
        ```
    - Instale as dependências:
        ```bash
        $ npm install
        ```
    - Na raíz da pasta `backend` crie um arquivo `.env` e coloque as seguintes variáveis de ambiente:
        ```bash
        DB_USER= # coloque o usuário definido no MongoDB Atlas
        DB_PASS= # coloque a senha definida no MongoDB Atlas
        PORT=5000
        ENV=development
        JWT_SECRET= # coloque o jwt secret da sua preferência
        ```
    - Agora, basta executar a aplicação:
        ```bash
        $ npm run dev
        ```
        > O backend irá rodar na porta 5000, como definido no arquivo `.env`
- Front-end
    - Agora, volte para a pasta raíz da aplicação `community` e acesse a pasta `frontend`:
        ```bash
        $ cd frontend
        ```
    - Instale as dependências:
        ```bash
        $ npm install
        ```
    - Agora, basta executar a aplicação:
        ```bash
        $ npm run dev
        ```
    - Após executar a aplicação, basta acessar `localhost:5173` no navegador para acessar a aplicação.

        > A  aplicação front-end irá executar na porta `5173` que é a porta padrão do [Vite](https://vitejs.dev/guide/)

<h1 id="license">📝 Licença</h1>

Este repositório está licenciado pela **MIT LICENSE**. Para mais informações detalhadas, leia o arquivo [LICENSE](./LICENSE) contido neste repositório.

<h1 id="author">Autor</h1>

Feito com 💜 por luizfelipeapolonio
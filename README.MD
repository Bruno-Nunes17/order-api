# API de Pedidos

Essa API oferece uma maneira eficiente de gerenciar o ciclo de vida dos pedidos, facilitando a integração com outras aplicações e sistemas, além de garantir que os usuários tenham acesso ao seu histórico completo de transações.

**STACK PRINCIPAL:** *Typescript, NodeJS, Prisma, Fastify, PostgreSQL & Padrões REST*

## O QUE FOI UTILIZADO E ABSORVIDO DURANTE O PROJETO

- Padrões **REST**
- Verbos **HTTP**
- Status Code
- Endpoints Amigáveis
- Banco de Dados Relacional **PostgreSQL**, utilizando **Prisma**
- Gerenciamento de Autenticação com **JWT**
- Hashing de Senhas com **Argon2**
- Tratamento de Erros e Validação de Dados
- Variáveis de Ambiente com **Dotenv**
- Testando Requisições para a API com **Insomnia**
- Utilização de **Fastify** na Implementação da API
- Utilização de Typescript para Tipagem Estática
- Estruturação de Código em Módulos

## GUIA RÁPIDO DE INSTALAÇÃO
**1 - Dependências Iniciais**

Antes de qualquer coisa, você precisa ter instalado o [`NPM & Node`](https://nodejs.org/en/) + [`Git`](https://git-scm.com/). Para instalar, siga o passo a passo de cada link listado abaixo:

- [`NPM & Node`](https://nodejs.org/en/)
- [`Git`](https://git-scm.com/)

**2 - Clonando o Repositório**

Para começar, você precisa clonar o repositório da API. Abra seu terminal e execute o seguinte comando:

```sh
git clone <URL do repositório>
cd <nome da pasta do repositório>
```
**3 - Base de Dados**

Como estamos utilizando o PostgreSQL, você precisa configurar o banco de dados localmente ou em um serviço como o Heroku ou Railway. Para instalar o PostgreSQL localmente, você pode seguir as instruções do [site oficial do PostgreSQL](https://www.postgresql.org/download/).

Após a instalação do PostgreSQL, será necessário gerar uma string de conexão. Para isso, siga os passos:

- Crie um banco de dados no PostgreSQL e um usuário com permissões para acessar esse banco.
- Gere a string de conexão que terá a seguinte estrutura: 
```sh
postgres://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>
```
**4 - Configuração do Ambiente**

Tendo gerado a string, procure pelo arquivo .env.example e siga o passo a passo abaixo:

- Cole a string no lugar indicado dentro do arquivo. Deverá ficar algo como:
```sh
DATABASE_URL="postgres://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>"
```
- Renomeie o arquivo para .env.

**5 - Instalação das Dependências**

Na raiz do seu projeto, execute o seguinte comando para instalar as dependências necessárias:
```sh
npm install
```

**6 - Executando a Aplicação**

Para iniciar a aplicação, execute o seguinte comando:
```sh
npm run dev
```
Agora você deve conseguir acessar a API em http://localhost:3000 (ou a porta que você tiver configurado).
### Edpoints

`POST /register`: <br/>
Método para fazer o cadastro do usuário. Você deve enviar no corpo da requisição um campo **“name”** com o nome do usuário, um campo **“email”** com o email do usuário e um campo **“password”** com a senha do usuário. <br/>

`POST /login`:  <br/>
Método para autenticar um cliente. Você deve enviar no corpo da requisição um campo **“email”** e **“password”** para realizar o login. Ele retorna um token de autenticação. <br/>

`POST/newproduct`:  <br/>
Método para adicionar novos produtos no banco de dados necessarios para o uso da api. Você deve enviar no corpo da requisição os seguintes campos: **name**, **description**, **price** e **stock**  <br/>

`POST/order`:  <br/>
Método para criar um novo pedido. Para isso, você deve enviar no corpo da requisição os detalhes do pedido, como **userId** e **orderItems** que é um array com os sequintes campos **productId** onde você deve enviar o id do produto escolhido e **quantity** onde você deve enviar a quantidade desejado. <br/>

`GET/products`:  <br/>
Método para listar os produtos disponíveis. Ele retorna uma lista de produtos, incluindo informações como nome, descrição e preço. <br/>

`GET/orders/:userId`:  <br/>
Método para listar os pedidos de um usuário específico. Para isso, você deve fornecer o **userId** na URL para filtrar os pedidos daquele usuário. <br/>

`PUT/order/:orderId/status`:  <br/>
Método para atualizar o status de um pedido. Você deve enviar no corpo da requisição o novo **status** do pedido e fornecer o **orderId** na URL. <br/>

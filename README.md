# facilita-juridico-api

Teste para a vaga de desenvolvedor full stack na empresa Facilita Jurídico (backend).

Este projeto roda juntamente ao [Frontend](https://github.com/gabrielcaamargo/facilita-juridico-web)

### Estrutura

O projeto está organizado da seguinte maneira: 
  - src: Contém todos os arquivos do projeto. É o _core_ do projeto.
    - app: Contém as regras de negócios e suas definições (casos de uso, entidades, etc)
      - controllers: Contém os casos de uso. Aqui estão definidas as regras de negócio
      - dtos: Aqui estão presentes as interfaces usadas para definir o tipo dos dados que chegarão nas requisições
      - middlewares: Contém as funções que serão executadas antes de cada rota ser acessada para verificar se a request segue um determinado padrão, ou usada também para definir alguma coisa         na request antes de chegar na rota.
      - repositories: Aqui implementei um _design pattern_, o _Repository Pattern_. Este pattern implica que: as regras de negócio (controllers, no contexto desta aplicação) devem estar em uma camada paralela à camada de acesso ao banco de dados. Dito isso, um controller deve implementar os métodos presentes no seu repository correspondente (ex: o controller CustomerController deve implementar os métdodos presentes no CustomerRepository). Este pattern também facilita a alteração de banco de dados, ou ORM (exemplo: trocar o banco de dados de Postgres para Mongo, por algum motivo). Visto que alterando em somente um local (repository), todos aqueles que o implementam, nem saberiam que o banco de dados foi trocado e continuariam funcionando normalmente, facilitando a manutenção do app em si - types: Contém a tipagem utilizada para tipar parâmetros e constantes da aplicação
    - database: Aqui contém as integrações com o banco de dados, conexão, queries para criar tabela, colunas, etc.

### Como executar este projeto

Para executar o projeto você vai precisar das seguintes ferramentas previamente instaladas:

1. [NodeJS](https://nodejs.org/en)
2. [Docker](https://www.docker.com/)
3. Npm (vem instalado junto ao NodeJS)
4. Yarn
   1. Para instalar você deve seguir os seguintes passos:
      1. Abra o seu terminal
      2. ```bash
         $ npm i --g yarn
         ```

#### Clone o projeto

1. ```bash
   $ git clone https://github.com/gabrielcaamargo/facilita-juridico-api.git
   $ cd facilita-juridico-api
   ```

#### Inicie o container Docker

```bash
$ docker compose up -D
```

#### Execute o projeto

```bash
# Ambiente de desenvolvimento
$ yarn
$ yarn start:dev

# Ambiente de produção
$ yarn
$ yarn build
$ node dist/index.js
```

Com estes comandos executados, o projeto estará rodando em http://localhost:3000/api/v1

Observação final: Neste projeto, evitei ao máximo o uso de bibliotecas externas, sendo as únicas que utilizei:
  1. Express (criação da api)
  2. Typescript
  3. Nodemon + ts-node (para melhor e mais ágil ambiente de desenvolvimento) 

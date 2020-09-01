# Patients API
### Stack Utilizada
* [Node.JS](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Mongo DB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [express-validator](https://express-validator.github.io/)
* [Jest](https://jestjs.io/)
### Como executar

Para executar é necessário ter o Mongo DB instalado ou uma conta no [Mongo Atlas](https://www.mongodb.com/cloud/atlas).
[Guia de como utilizar o Mongo Atlas](https://medium.com/@sergio13prez/connecting-to-mongodb-atlas-d1381f184369)
Crie um arquivo *.env* no diretório raiz do projeto com o conteúdo:
```
DATABASE_URI='Coloque aqui a URI/String de Conexão do servidor Mongo'
```

Depois de configurado o arquivo *.env* instale as dependencias do projeto e execute o script *start*

#### Yarn
```sh
$ yarn
$ yarn start
```
#### NPM
```sh
$ npm i
$ npm run start
```

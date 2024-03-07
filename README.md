# Ferramentas utilizadas

## Ambiente

NodeJS - v20.11.1
Visual Studio Code - v1.87.0
PostGreSql - v16.2.1

## Dependencias

eslint: 8.29.0,
eslint-config-airbnb-base: 15.0.0,
eslint-config-google: 0.14.0,
eslint-plugin-import: 2.26.0
cors: 2.8.5,
dotenv: 16.4.5,
express: 4.18.3,
helmet: 7.1.0,
jsonwebtoken: 9.0.2,
nodemon: 3.1.0,
pg: 8.11.3,
sucrase: 3.35.0

## Como iniciar

Primeiro, executar o comando yarn install/npm i para resolver as dependencias do projeto. Logo após, modificar o arquivo .env, com as informações do seu PostGres em execução, como host, porta, nome do usuario, senha do bamco caso tenha e o nome do banco. Depois disso, deve-se alterar o arquivo src/config/appConfig.js com o ip e a porta que serão utilizados. Depois disso, basta executar o comando npm run dev para executar a API com o Nodemon.

Obs: No arquivo src/server.js, há a linha // await Cliente.createtable(), descomente ela para criar a tabela e comente novamente para não ficar levantando um erro.

 

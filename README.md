## Descripción

Desarrollo de una API para el [Tutorial NestJS](https://ualmtorres.github.io/SeminarioNestJS/). La API trabaja con bases de datos (MySQL y PostgreSQL) e implementa endpoints para las operaciones básicas (`find, findOne, create, update, delete`). El tutorial comienza creando un armazón con los controladores y servicios funcionando en modo mock. Una vez probada la conexión correcta entre ellos, sustituye los servicios para que interactúen con la base de datos. Además, la API implementa control de acceso a los endpoints mediante JSON Web Tokens, queda documentada con Swagger y registra sus operaciones en archivos de log.

## Instalación

```bash
$ npm install
```

## Ejecución de la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Creación de los contenedores de bases de datos

Para trabajar localmente con persistencia se necesistará una base de datos a la que conectarnos. Para evitar complicaciones con instalaciones y no acoplar el desarrollo a nuestro equipo utilizaremos

- Una imagen Docker de MySQL 5.7
- Una imagen Docker de PostgreSQL

### Creación del contenedor MySQL

```bash
$ docker run --name tutorial_mysql -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 -d mysql:5.7
```

Iniciar una sesión interactiva en el contenedor con

```bash
$ docker exec -it tutorial_mysql bash
```

Iniciar una sesión MySQL en el contenedor usando como password del `root` el valor `secret`

```bash
# mysql -u root -p
```

En el CLI de MySQL, crear una base de datos denominada `tutorial`

```sql
create database tutorial;
```

### Creación del contenedor PostgreSQL

```bash
#!/bin/bash
set -e

SERVER="tutorial_postgres";
PW="secret";
DB="tutorial";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
```

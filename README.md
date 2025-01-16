# INSTRUCTIONS

This is a sample backend application developed in [Nest](https://github.com/nestjs/nest) for Apply-Digital

## Step 1:

Clone git repository from

```shell
git clone git@github.com:raforios/apply-digital.git

```

## Step 2:

Create a file called .env.prod with the following structure:

```shell

 cd ./apply-digital/products

nano .env.prod

# Copy this content and put the password you want

#POSTGRESQL
POSTGRES_PORT_CONTAINER=5432
POSTGRES_PORT_PC=5433
POSTGRES_PASSWORD='XXXXXX'
POSTGRES_USER=postgres
POSTGRES_DB=saas_platform
POSTGRES_HOST=pg-database

#PGADMIN
PGADMIN_DEFAULT_EMAIL=test@test.com
PGADMIN_DEFAULT_PASSWORD='XXXXXXX'
PGADMIN_LISTEN_PORT_CONTAINER=80
PGADMIN_LISTEN_PORT_PC=8085

```

## Step 3:

Create the Docker image for the application in Nest

```shell

docker build -t nestjs-app .

cd ..
```

## Step 4:

Create the entire database and application environment by running docker compose

```shell
docker compose --env-file ./products/.env.prod up -d 

```

## Step 5:

To test the API and all its endpoints, see the [Swagger](https://swagger.io/) documentation located at the following URL:

```shell
http://localhost:3100/api/docs

```

## Step 6:

To terminate the containers and shut down the application you must run

```shell
docker compose --env-file ./products/.env.prod down

```


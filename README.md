# INSTRUCTIONS

This is a sample backend application developed in [Nest](https://github.com/nestjs/nest) for Apply-Digital

## Step 1:

Clone git repository from

```shell
git clone git@github.com:raforios/apply-digital.git

```

## Step 2:

Create the Docker image for the application in Nest

```shell

cd ./apply-digital/products

docker build -t nestjs-app .

cd ..
```

## Step 3:

Create the entire database and application environment by running docker compose

```shell
docker compose --env-file ./products/.env.prod up -d 

```

## Step 4:

To test the API and all its endpoints, see the [Swagger](https://swagger.io/) documentation located at the following URL:

```shell
http://localhost:3100/api/docs

```

## Step 5:

To terminate the containers and shut down the application you must run

```shell
docker compose --env-file ./products/.env.prod down

```


![Frame 1](https://user-images.githubusercontent.com/34681035/229315306-eea7671f-6592-4f9f-8934-a08106156e41.png)

  <a href="https://github.com/bo3ouf/nextflix-ts/blob/main/LICENSE">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=99EDC3"/>
  </a>

Nextflix is NOT NETFLIX, but it's a netflix clone built with Next.js, Prisma, TypeScript, TailwindCSS, MongoDB, and Docker 😉.

I made this project for fun and to learn more about Next.js, Prisma, TypeScript, TailwindCSS, MongoDB, and Docker, but this could be a good starting point for a streaming platform project similar to Netflix.

# Features (Work in Progress)

- [ ] Authentication (Login, Register, Logout)
- [ ] User Settings
- [ ] Dashboard

# Getting Started

We need to build and compose the Docker Image, you can keep the DB environment variable as `mongodb://mongo:27017` if you'd like to use the MongoDB available in our Docker Container, or you could also use [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud) to make a cloud MongoDB database where MongoDB offers a free version/trial.

## Setting the Environment Variables

Create a .env file in the root folder of the app
Add the following if you're going to use the docker MongoDB

```bash
DB=mongodb://mongo:27017/users?retryWrites=true&w=majority&replicaSet=rs0
```

OR (For [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud))

```bash
DB=mongodb://USERNAME:PASSWORD@HOST/DATABASE
```

## Composing our docker.compose.yaml

```bash
docker-compose -f  docker-compose.yaml up
```

## Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![Frame 1](https://user-images.githubusercontent.com/34681035/229315306-eea7671f-6592-4f9f-8934-a08106156e41.png)

  <a href="https://github.com/bo3ouf/nextflix-ts/blob/main/LICENSE">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=99EDC3"/>
  </a>

Nextflix is NOT NETFLIX, but it's a netflix clone built with Next.js, Prisma, TypeScript, TailwindCSS, MongoDB, and Docker 😉.

I made this project for fun and to learn more about Next.js, Prisma, TypeScript, TailwindCSS, MongoDB, and Docker, but this could be a good starting point for a streaming platform project similar to Netflix.

# Features (Work in Progress)

- [ ] Authentication (Login, Register, Logout)
- [ ] User Settings
- [ ] Dashboard

# Getting Started

We need to build and compose the Docker Image, you can keep the DB environment variable as `mongodb://mongo:27017` if you'd like to use the MongoDB available in our Docker Container, or you could also use [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud) to make a cloud MongoDB database where MongoDB offers a free version/trial.

## Setting the Environment Variables

Create a .env file in the root folder of the app
Add the following if you're going to use the docker MongoDB

```bash
DB=mongodb://localhost:27017/users?retryWrites=true&w=majority
```

OR (For [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud))

```bash
DB=mongodb://USERNAME:PASSWORD@HOST/DATABASE
```

## Composing our docker.compose.yaml

```bash
docker-compose -f  docker-compose.yaml up
```

## Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

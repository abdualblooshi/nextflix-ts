![Frame 1](https://user-images.githubusercontent.com/34681035/229315306-eea7671f-6592-4f9f-8934-a08106156e41.png)

  <a href="https://github.com/bo3ouf/nextflix-ts/blob/main/LICENSE">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=99EDC3"/>
  </a>
  
# Please note this is a work in progress

## Getting Started

First we need to build the Docker Image, you can keep the DB environment variable as `mongodb://mongo:27017` if you'd like to use the MongoDB available in our Docker Container, or you could also use [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud) to make a cloud MongoDB database where MongoDB offers a free version/trial.

If you've decided to go with MongoDB Atlas then replace `mongodb://mongo:27017` with your own database URL in the build command below.

### Building the Docker Image
```bash
docker build -t nextflix --build-arg DB=mongodb://mongo:27017 .
```
OR
```bash
docker build -t nextflix --build-arg DB=<MONGODB_CLOUD_URL> .
```
If you're using MognODB Atlas replace `<MONGODB_CLOUD_URL> ` with your Database URL

### Composing our docker.compose.yaml
```bash
docker-compose -f  docker-compose.yaml up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

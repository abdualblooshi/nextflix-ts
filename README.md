![Frame 1](https://user-images.githubusercontent.com/34681035/229315306-eea7671f-6592-4f9f-8934-a08106156e41.png)

  <a href="https://github.com/bo3ouf/nextflix-ts/blob/main/LICENSE">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=99EDC3"/>
  </a>

## Getting Started

Make sure to define a `PRODUCTION_DB_URL` environment variable whether you're using Vercel, Github Pages etc..

You could just deploy the Docker Container or you could use [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud) , if you use the Docker Container keep the `PRODUCTION_DB_URL` as `mongodb://mongo:27017` otherwise change it to the desired [MongoDB Atlas/Cloud](https://www.mongodb.com/cloud) URL

Running development/production using Docker (Production still WIP)
```bash
docker-compose up -f docker-compose.yaml
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

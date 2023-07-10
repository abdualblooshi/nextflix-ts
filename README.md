## (Still a work in progress)

![Frame 1](https://user-images.githubusercontent.com/34681035/229315306-eea7671f-6592-4f9f-8934-a08106156e41.png)

  <a href="https://github.com/bo3ouf/nextflix-ts/blob/main/LICENSE">
    <img alt="license url" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=99EDC3"/>
  </a>

Nextflix is NOT NETFLIX, but it's a netflix clone built with Next.js, Prisma, TypeScript, TailwindCSS, MongoDB 😉.

I made this project for fun and to learn more about Next.js, Prisma, TypeScript, TailwindCSS, MongoDB, but this could be a good starting point for a streaming platform project similar to Netflix (literally a clone 😅).

# Getting Started

## Setting the Environment Variables

Create a .env file in the root folder of the app

Add the following for a dev environment:

```bash
DB=mongodb://USERNAME:PASSWORD@HOST/DATABASE
NEXTAUTH_JWT_SECRET="NEXT-JWT-SECRET"
NEXTAUTH_SECRET="NEXT-SECRET"
NODE_ENV="development"
```

OR use the following for production:

```bash
DB=mongodb://USERNAME:PASSWORD@HOST/DATABASE
NEXTAUTH_JWT_SECRET="NEXT-JWT-SECRET"
NEXTAUTH_SECRET="NEXT-SECRET"
NODE_ENV="production"
```

## Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

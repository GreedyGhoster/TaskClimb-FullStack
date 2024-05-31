# TaskClimb-FullStack

## Note

If you need pure axios (without swr), go to the [only-axios](https://github.com/GreedyGhoster/TaskClimb-FullStack/tree/only-axios) branch

## Quick Start

```shell
git clone https://github.com/GreedyGhoster/TaskClimb-FullStack.git
```

Next add your data to `.env.example` and `docker-compose.example.yaml`. Then rename them to `.env` and `docker-compose.yaml`

### _Open the root folder and enter `npm i` and turbo will install all dependencies_

Then in the root folder enter

```shell
npm run dev
```

### Swagger

You can open swagger ui after `npm run dev`

```
http://localhost:4580/swagger
```

### Server

Server side was built using Nest and "npm" package manager

> For using TaskClimb-FullStack must to install **_Docker_**

- Backend: [Nest](https://nestjs.com/)
- ORM: [Prisma](https://www.prisma.io/)
- DataBase: [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Client

Client side was built using React(Vite) and "npm" package manager

- Client: [React](https://ru.legacy.reactjs.org/), [SWR](https://swr.vercel.app/)

## Screenshots

Project page
![](./screenshots/ProjectPage.png)

### For errors

Uncaught Error: Cannot find module 'react'

```shell
$ npm install --save react react-dom @types/react @types/react-dom
```

If he writes that he doesn’t know “turbo”, then write this

```shell
$ npm i turbo
```

## License

TaskClimb-FullStack MIT Licensed

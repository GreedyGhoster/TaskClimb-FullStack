# TaskClimb-FullStack

## Quick Start
``` shell
git clone https://github.com/IuanPR/TaskClimb-FullStack.git
```

### Server
Server side was built using Nest and "yarn" package manager

> For using TaskClimb-FullStack must to install ***Docker*** 

* Backend: [Nest](https://nestjs.com/)
* ORM: [Prisma](https://www.prisma.io/)
* DataBase: [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

```shell
cd server
yarn
yarn db:dev:restart
yarn start:dev
```
> To see all commands in /server need to go to server/packege.json

### Client
Client side was built using React(Vite) and "yarn" package manager
* Client: [React](https://ru.legacy.reactjs.org/)

```shell
cd client
yarn
yarn dev
```
> Or refer to the [Vite](https://vitejs.dev/guide/) website

### For errors
Uncaught Error: Cannot find module 'react'
```shell
$ npm install --save react react-dom @types/react @types/react-dom
```

## License
TaskClimb-FullStack MIT Licensed

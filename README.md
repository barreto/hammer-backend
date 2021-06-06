<img src="https://github.com/barreto/hammer-frontend/blob/main/public/hammer-backend.png?raw=true" width="1200"/>

___

<h4 align="center">
    <a href="#hammer_and_pick-about">About</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#hammer_and_pick-techs">Techs</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#hammer_and_pick-prerequisites">Prerequisites</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#hammer_and_pick-how-to-run">How to run</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="https://github.com/barreto/hammer-frontend">Front-end</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#hammer_and_pick-builders">Builders</a>
</h4>

___

## :hammer_and_pick: About

Hammer is a consistent app aimed at whoever
want to manage your infrastructure optimally, flexibly,
agile and above all simple.

In this way, registered customers can create images,
delete them individually and in their entirety, create containers
based on the images you can download them, run, pause, restart and much more.

## :hammer_and_pick: Techs

- [Axios](https://www.npmjs.com/package/axios)
- [Express](http://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cripto-JS](https://www.npmjs.com/package/crypto-js)
- [Postman](https://www.postman.com/)
- [Typescript](https://www.typescriptlang.org/)

## :hammer_and_pick: Prerequisites

### :hammer: Environment variables
For the application to work correctly it is necessary to include some environment variables in a file dedicated to this purpose.

The file must be called ```.env``` and you basically must enter the following variables.

```
PORT=
HOSTNAME=
DOCKER_URL=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=
```
To make the process easier you can just delete the *.example* in the [.env.example](https://github.com/barreto/hammer-backend/blob/main/.env.example) file and use your infrastructure information.

### :hammer: Dependencies

To install the dependencies your should user the comand. an:
```sh
npm install
# or
yarn install
```

## :hammer_and_pick: How to run


### :hammer: Development 
Start development server with the following command:
```sh
npm run dev
# or
yarn run dev
```

### :hammer: Production 

*In progress...* :construction:

## :hammer_and_pick: Endpoints

Fork the postman workspace to your account, download it and change according your host. 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/16086736-f547c1c0-7805-4e8e-9e27-67109a450ce2?action=collection%2Ffork&collection-url=entityId%3D16086736-f547c1c0-7805-4e8e-9e27-67109a450ce2%26entityType%3Dcollection%26workspaceId%3Dec8a6d45-32d2-490a-b037-4f272950692a#?env%5BHammerAPI-Dev%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjgwMDEvIiwiZW5hYmxlZCI6dHJ1ZX1d)

## :hammer_and_pick: Builders 

<h4 align="center">
  <a href="https://github.com/">Leonardo Morais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/lucaspolizeli">Lucas Polizeli</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/thalees">Thales Pereira</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/barreto">Victor Barreto</a>
</h4>

<p align="center">
    
<img src="https://github.com/barreto/hammer-frontend/blob/main/public/hammer.svg?raw=true"  width="300"/>

</p>

___

<h6 align="center"><i>Have a Hammer experience.</i></h6>

___


<h5 align="center">

  <img src="https://badges.pufler.dev/visits/barreto/hammer-backend" alt="Visits Badge" width="auto"/>
  <img src="https://img.shields.io/github/last-commit/barreto/hammer-backend" alt="Last update" width="auto"/>
  <img src="https://img.shields.io/github/repo-size/barreto/hammer-backend" alt="Repo size" width="auto"/>

</h5>
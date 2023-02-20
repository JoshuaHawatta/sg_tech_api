# SG_TECH_API

A simple api for adding appointments at the SG Tech shop.
Here is a README for the page structure and what I´ve learned with this project

Author: [Joshua Hawatta](http://joshuahawatta.com)

## STACKS

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Javascript" />
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
  <img alt='Typescript' src='https://img.shields.io/badge/Typescript-100000?style=for-the-badge&logo=Typescript&logoColor=white&labelColor=3178c6&color=3178c6'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
  <img alt='node.js' src='https://img.shields.io/badge/Node.js-100000?style=for-the-badge&logo=node.js&logoColor=FFFFFF&labelColor=3c873a&color=3c873a'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
  <img alt='Express' src='https://img.shields.io/badge/Express-100000?style=for-the-badge&logo=Express&logoColor=white&labelColor=282424&color=282424'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
  <img alt='mongodb' src='https://img.shields.io/badge/Mongoose-100000?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=4DB33D&color=4DB33D'/>
</a>

## LIBS

<a href='https://github.com/shivamkapasia0' target="_blank">
	<img alt='JWT' src='https://img.shields.io/badge/JWT-100000?style=for-the-badge&logo=JWT&logoColor=white&labelColor=374350&color=374350'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
	<img alt='Moment' src='https://img.shields.io/badge/Moment-100000?style=for-the-badge&logo=Moment&logoColor=white&labelColor=374350&color=BDA826'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
	<img alt='Multer' src='https://img.shields.io/badge/Multer-100000?style=for-the-badge&logo=Multer&logoColor=white&labelColor=374350&color=6028CB'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
	<img alt='Node mailer' src='https://img.shields.io/badge/Node_mailer-100000?style=for-the-badge&logo=Node mailer&logoColor=white&labelColor=374350&color=E0103B'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
	<img alt='CORS' src='https://img.shields.io/badge/CORS-100000?style=for-the-badge&logo=CORS&logoColor=white&labelColor=374350&color=49C037'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
	<img alt='bycrypt' src='https://img.shields.io/badge/BYCRIPT-100000?style=for-the-badge&logo=bycrypt&logoColor=white&labelColor=374350&color=679BE5'/>
</a>

<a href='https://github.com/shivamkapasia0' target="_blank">
  <img alt='Express' src='https://img.shields.io/badge/Express_validator-100000?style=for-the-badge&logo=Express&logoColor=white&labelColor=282424&color=282424'/>
</a>

## AT ROOT DIRECTORY

### node_modules

```
where all of my dependencies are. Probably you don´t have it if you cloned this repo. just run "npm install" and it´s done! :)
```

### src

```
the main directory for all the application files and sub-directories.
```

## OTHER FILES OF ROOT DIRECTORY

```
.env.example: enviroment vars stay here. create a ".env" file and replace all examples with your own data.
.eslintrc.json: project linting configuration.
.gitignore: all files and directories the git must ignore
package*.json: my package managers.
README.md: documentation
tsconfig.json: typescript configuration file
```

## INSIDE src DIRECTORY

```
config: where the application, mailing and multer configurations are.
database: database connection.
DTOs: where it has other 2 sub-directories for my DTOs files (User and Appointments).
entities: same 2 sub-directories of DTOs. Here is where the controllers, routing and DB schemas are.
helpers: JWT and Mailing handlers, and date-handling functions.
interfaces: the interfaces of my entities.
middlewares: my requests validations directory, a validation results getter and a JWT verifyer.
types: custom types in here.
server.ts: main file for running the application
```

# Prospects Selector

_Minimal full-stack prototype using Node.js, Express, MongoDB, and React_

## Backend Info
La importacion del archivo CSV se realiza en forma automatica al lanzar el servidor (una sola vez)

El archivo CSV debe adjuntarse al folder principal

_Importing the CSV file is done automatically when launching the server (one time only)_

_The CSV file must be attached to the main folder_


## Calculo del Score
CRITERIOS

Años de experiencia: Cuanto más experiencia, mayor probabilidad de éxito.

Industria: Clasificacion de acuerdo a su peso en el Mercado.

Puesto de trabajo: Si el puesto tiene más responsabilidades o autonomía en las decisiones, se otorga mayor peso.

Tamaño de la empresa: Las grandes empresas pueden tener más recursos, pero las pequeñas pueden ser más ágiles.

Para que los factores sean comparables, se realizó una normalizacion de datos.

En las empresas existen tres niveles de decisión: el primer nivel es el estratégico, formado por la Dirección General, así como las direcciones de área, el segundo nivel es el táctico o gerencial y, por último, el nivel operativo. De acuerdo a ese criterio se otorgaron los pesos de los cargos.

### Implementation

- [NodeJS v20.15.0](https://nodejs.org/)

### Dependencies

_All dependencies have been installed from the **npm** repository_

"cors": "^2.8.5"

"csv-parser": "^3.0.0"

"dotenv": "^16.4.7"

"express": "^4.21.2"

"express-rate-limit": "^7.4.1"

"helmet": "^8.0.0"

"mongoose": "^8.8.4"

### devDependencies

"@eslint/js": "^9.16.0"

"eslint": "^9.16.0"

"prettier": "^3.4.2"

## Server
Posicionarse en la carpeta "backend" (cd backend) y ejecutar "npm install"

IMPORTANTE: Antes de hacer correr el servidor, lanzar mongoDB en local, mediante el comando _mongod_ en consola

Ejecutar "npm run server" para hacerlo correr en local

Se lanzara en http://localhost:5000

## Frontend
Aplicación basica de React

Posicionarse en la carpeta "client" (cd client) y ejecutar "npm install"

Ejecutar "npm start" para hacerlo correr en local

Se lanzara en http://localhost:3000

### Dependencies

 "react": "^19.0.0"
 
 "react-dom": "^19.0.0",
 
 "react-scripts": "5.0.1",
 
 "web-vitals": "^2.1.4"

## Variables de Configuración

MONGO_URI = 'mongodb://127.0.0.1:27017/prospects'

ORIGIN_CORS = 'http://localhost:3000'

PORT = 5000

## Versionado

Version 1.0.0 - Upload 12/12/2024

## Autor

**Sandra Monserrat**

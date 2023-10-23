# Backend de una aplicación ecommerce

## Tabla de Contenidos

- [Instalación del proyecto](#instalación-del-proyecto)
- [Rutas del proyecto](#rutas-del-proyecto)
- [Variables de entorno](#variables-de-entorno-a-configurar-en-un-env)
- [Scripts para ejecutar la aplicacion](#scripts-para-ejecutar-la-aplicacion)
  - [Development con persistencia de datos en mongo](#development-con-persistencia-de-datos-en-mongo)
  - [Development con persistencia de datos en memoria](#development-con-persistencia-de-datos-en-memoria)
  - [Production](#production)
  - [QA](#qa)
- [Documentación de swagger](#documentación-de-la-api)
- [Manejo de usuarios](#manejo-de-usuarios)
  - [Creacion de usuarios](#creacion-de-usuarios)
  - [Login de usuarios](#login-de-usuarios)
  - [Logout de usuarios](#logout-de-usuarios)
  - [Cambio de rol de usuarios](#cambio-de-rol-de-usuarios)
  - [Lista de usuarios](#lista-de-usuarios)
  - [Eliminación de un usuario individual](#eliminación-de-un-usuario-individual)
  - [Eliminación de usuarios inactivos](#eliminación-de-usuarios-inactivos)
- [Manejo de productos](#manejo-de-productos)
  - [Agregar un producto](#agregar-un-producto)
  - [Obtener todos los productos](#obtener-todos-los-productos)
  - [Editar un producto](#editar-un-producto)
  - [Eliminar un producto](#eliminar-un-producto)
- [Manejo de carritos](#manejo-de-carritos)
  - [Creación de un carrito](#creación-de-un-carrito)
  - [Obtener datos de un carrito](#obtener-datos-de-un-carrito)
  - [Agregar producto a un carrito](#agregar-producto-a-un-carrito)
  - [Editar cantidad de un producto a un carrito](#editar-cantidad-de-un-producto-a-un-carrito)
  - [Eliminar un producto a un carrito](#eliminar-un-producto-a-un-carrito)
  - [Finalizar compra del contenido del carrito](#finalizar-compra-del-contenido-del-carrito)
- [Despliegue de la aplicación](#despliegue-de-la-aplicación)

# Instalación del proyecto

Clonar repositorio y realizar la instalación de todas las dependencias con el siguiente comando

```shell
npm install
```

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Rutas del proyecto

El proyecto esta conformado por las siguientes rutas:

```
└── src/
    ├── config/
    │   └── ...
    │── controllers/
    │   └── ...
    │── dao/
    │   │── factory/
    │   │   └── ...
    │   │── managers/
    │   │   └── ...
    │   └── models/
    │       └── ...
    │── docs/
    │   │── 1sessions/
    │   │   └── ...
    │   │── 2users/
    │   │   └── ...
    │   │── 3products/
    │   │   └── ...
    │   └── 4carts/
    │       └── ...
    │── dto/
    │   └── ...
    │── middleware/
    │   └── ...
    │── public/
    │   │── js/
    │   │   └── ...
    │   └── uploads/
    │       └── ...
    │── repositories/
    │   └── ...
    │── routes/
    │   └── ...
    │── services/
    │   └── ...
    └── views/
        └── layouts/
│           └── ...
└── tests/
    └── models/
        └── ...

```

- `src/config`: Archivos de configuración
- `src/controllers`: Controladores de rutas
- `src/dao`: Componentes y clases relacionados con la interacción con la base de datos o el almacenamiento de datos en un proyecto
- `src/docs`: Archivos YAML para la documentación de APIs
- `src/dto`: Clases o módulos que definen los DTO utilizados en tu aplicación
- `src/middleware`: Archivos que contienen middleware personalizados o componentes que se utilizan para ejecutar tareas específicas
- `src/public`: Para almacenar recursos públicos
- `src/repositories`: Repositorios que contienen métodos para realizar operaciones de lectura, escritura, actualización y eliminación de datos.
- `src/routes`: Rutas de la aplicación
- `src/services`: Contiene la lógica de acceso a datos
- `src/views`: Handlebars para renderizar vistas

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Variables de entorno a configurar en un .env

- `NODE_ENV=`: Especifica el entorno en el que se ejecuta la aplicación
- `MONGO_DB_CONNECTION=`: Cadena de conexión a una base de datos MongoDB
- `SESSION_SECRET=`: Clave secreta utilizada para firmar y proteger las sesiones de usuario con express-session
- `PORT=`: Especifica el puerto en el que correra la aplicación
- `EMAIL_USER=`: Usuario de gmail para usar mailer
- `EMAIL_PASS=`: Clave para aplicaciones de gmail

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Scripts para ejecutar la aplicacion

inicia el proyecto con el script standard en node

```shell
npm run start
```

## Development con persistencia de datos en mongo

```shell
npm run start:development:mongo
```

## Development con persistencia de datos en memoria

```shell
npm run start:development:memory
```

## Production

```shell
npm run start:production:mongo
```

## QA

```shell
npm run start:test:mongo
```

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Documentación de la API

Para poder ver la documentación de swagger de la api ir a la url: `/api-docs`

Dentro de la documentación de swagger estan los endpoints mas importantes

Recomiendo empezar con la creacion de admin y usuario para realizar las pruebas necesarias igualmente gran mayoria del flujo de trabajo se encuentras en la documentacion de swagger

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Manejo de usuarios

## Creacion de usuarios:

La creacion de un usuario la podemos realizar haciendo uso del metodo POST en la ruta `http://localhost:PORT/api/session/register` con los siguientes datos de ejemplo:

```shell
{
  "first_name": "ejemplo",
  "last_name": "ejemplo",
  "email": "ejemplo@gmail.com",
  "age": 50,
  "password": "ejemplo"
}
```

La creacion del admin se realizara reemplazando email y password con los siguientes datos de relevancia los demas datos no importan siempre y cuando se utilicen estos 2 en especifico para la creacion del admin:

```shell
{
    "email": "adminCoder@coder.com",
    "password": "admin"
}
```

Cualquier usuario creado se asignara por defecto el rol de "usuario"
Para que el usuario pase a ser "premium" debera ser subir una identificación primero y luego hacer el cambio de roles sino se le denegara el cambio
O sino alguien con el rol "admin" tiene el poder de cambiar manualmente el rol del usuario entre "usuario" y "premium"

## Login de usuarios:

Luego de crear los usuarios puedes hacer el login en la ruta `http://localhost:PORT/api/session/login`

```shell
{
    "email": "adminCoder@coder.com",
    "password": "admin"
}
```

## Logout de usuarios:

Para hacer el logout de un usuario debes utilizar un metodo GET en la ruta `http://localhost:PORT/api/session/logout`

## Cambio de rol de usuarios:

El admin tiene poder para cambiar el rol de un usuario entre "usuario" y "premium" haciendo uso del metodo PUT en la siguiente ruta donde :uid es el id del usuario en tu base de datos `http://localhost:PORT/api/users/:uid` con cuerpo de la solicitud:

```shell
{                                   {
  "newRole": "usuario"      O         "newRole": "premium"
}                                   }
```

A su vez el usuario puede cambiar su propio rol pero primero debe subir una identificacion con metodo POST en `http://localhost:PORT/api/users/:uid/identificacion` asegurarse de lo siguiente:

- Elige el cuerpo de la solicitud en formato form-data
- En la configuracion del key utilizar el nombre identificacion
- En el value elegir formato de text a file que te permitira subir el archivo de identificacion

Realizada la subida de la identificacion podras realizar el cambio de rol desde "usuario" a "premium" con el metodo PUT en `http://localhost:PORT/api/users/premium/:uid` con cuerpo de la solicitud:

```shell
{
  "newRole": "premium"
}
```

## Lista de usuarios:

Solo el admin tiene permiso para ver esta lista asique recorda iniciar sesión con un admin para poder ver la lista debera hacer un GET en `http://localhost:PORT/api/users/allusers`

## Eliminación de un usuario individual:

Para eliminar un usuario deberas hacer un DELETE en `http://localhost:PORT/api/users/:uid` esto solo lo puede hacer el admin

## Eliminación de usuarios inactivos:

Tambien podras eliminar los usuarios que esten inactivos durante cierta cantidad de tiempo, esto no esta limitado solo por admin es un metodo que puede que este bueno que se ejecute de manera automatica cada cierto periodo de tiempo, en el proyecto esta configurado para realizar luego de solo segundos inactivo por cuestiones prácticas pero se puede cambiar el valor al que se desee pueden ser meses. Utiliza el DELETE en `http://localhost:PORT/api/users`

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Manejo de productos

## Agregar un producto:

Para agregar un producto a la base de datos se necesita el rol de "admin" o "premium", al agregar un producto como "premium" se le asigna a este usuario como el owner, se utiliza un metodo POST en `http://localhost:PORT/api/products` con cuerpo de la solicitud:

```shell
{
    "title": "producto prueba",
    "description": "producto prueba",
    "price": 1000,
    "code": "P1",
    "category":"producto"
}
```

## Obtener todos los productos:

Para obtener esta lista de productos deberas logear como "admin" los roles "usuario" y "premium" interactuan con estos productos pero con otras logicas desde la generacion de vistas, para obtener la lista se utiliza un metodo GET en `http://localhost:PORT/api/products`

## Editar un producto:

Para editar un producto deberas logear como "admin" o con rol "premium" si eres el owner de un producto puedes hacer la edicion de ese en especifico nada mas, la edicion la hacemos utilizando un metodo PUT en `http://localhost:PORT/api/products/edit/:id` con cuerpo de la solicitud:

```shell
{
    "title": "producto prueba editado",
    "description": "producto prueba editado",
    "price": 2000,
    "code": "P2",
    "category":"producto"
}
```

## Eliminar un producto:

Podras eliminar un producto de la base de datos como "admin" teniendo libertad de eliminar cualquier producto o como "premium" siendo owner del mismo, utiliza un metodo DELETE en la ruta `http://localhost:PORT/api/products/delete/:id`

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Manejo de carritos

## Creación de un carrito:

La creacion del carrito esta ligada a una logica al momento de hacer el registro por lo que no hay que hacer una creacion manual de un carrito para un usuario, la creacion esta limitada para el "admin" al momento de registrarlo este no recibira un carrito

## Obtener datos de un carrito:

Podras obtener los datos de un carrito deberas estas logeado, como admin podras ver el contenido de cualquier carrito de los usuarios, como un usuario solo podras ver el contenido de tu propio carrito, para hacer esto deberas utilizar un metodo GET en la ruta `http://localhost:PORT/api/cart/:cartId`

## Agregar producto a un carrito:

Para agregar un producto a un carrito deberas primero estar logeado y segundo no ser un admin ya que no posee un carrito, utilizaremos un metodo PUT en la ruta `http://localhost:PORT/api/cart/:cartId/add/:productId` No se puede agregar un producto duplicado al carrito por lo tanto al intentarlo dara un error

## Editar cantidad de un producto a un carrito:

Para editar la cantidad de un producto de un carrito, solo puedes editar la cantidad de un producto en tu propio carrito, se debera tener el producto agregado y utilizar el metodo PUT en la ruta `http://localhost:PORT/api/cart/:cartid/edit/:productId` con cuerpo de la solicitud con el quantity deseado:

```shell
{
  "quantity": 2
}
```

## Eliminar un producto a un carrito:

Para eliminar un producto de un carrito debes estar logeado y solo puedes eliminar el producto de tu propio carrito ademas de tener un producto agregado de antemano, deberas utilizar un metodo DELETE en la ruta `http://localhost:PORT/api/cart/:cartId/remove/:productId`

## Finalizar compra del contenido del carrito:

Para realizar la compra deberas estar logeado y tener por lo menos un producto en el carrito, sino no se concretara la compra del mismo, no creo que haga falta aclarar ya pero el carrito debe ser tu propio carrito, al final la compra se enviara un mail con un ticket describiendo detalles de la compra mas precio total, para hacerlo deberas utilizar un metodo POST en la ruta `http://localhost:PORT/api/cart/:cartId/purchase`

- [Volver a tabla de contenidos](#tabla-de-contenidos)

# Despliegue de la aplicación

Y por ultimo la aplicación se encuentra desplegada en Railway.app en el siguiente link:

[https://trabajofinalback-production-139b.up.railway.app/](https://trabajofinalback-production-139b.up.railway.app/)

- [Volver a tabla de contenidos](#tabla-de-contenidos)

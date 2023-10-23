# Backend de una aplicación ecommerce

# Ultima entrega

## Instalación del proyecto

Clonar repositorio y realizar la instalación de todas las dependencias con el siguiente comando

```shell
$ npm install
```

## Rutas del proyecto

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

## Variables de entorno a configurar en un .env:

- `NODE_ENV=`: Especifica el entorno en el que se ejecuta la aplicación
- `MONGO_DB_CONNECTION=`: Cadena de conexión a una base de datos MongoDB
- `SESSION_SECRET=`: Clave secreta utilizada para firmar y proteger las sesiones de usuario con express-session
- `PORT=`: Especifica el puerto en el que correra la aplicación
- `EMAIL_USER=`: Usuario de gmail para usar mailer
- `EMAIL_PASS=`: Clave para aplicaciones de gmail

## Scripts para ejecutar la aplicacion:

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

## Se recomiendo checkear la documentación de la API:

Para poder ver la documentación de swagger de la api ir a la url: `/api-docs`

Dentro de la documentación de swagger estan los endpoints mas importantes

Recomiendo empezar con la creacion de admin y usuario para realizar las pruebas necesarias igualmente gran mayoria del flujo de trabajo se encuentras en la documentacion de swagger

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

## Despliegie de la aplicacion

La aplicacion se encuentra desplegada en Railway.app en el siguiente link

[https://trabajofinalback-production-139b.up.railway.app/](https://trabajofinalback-production-139b.up.railway.app/)

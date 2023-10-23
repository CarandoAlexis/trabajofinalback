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

## Variables de entorno a configurar en un .env

- `NODE_ENV=`: Especifica el entorno en el que se ejecuta la aplicación
- `MONGO_DB_CONNECTION=`: Cadena de conexión a una base de datos MongoDB
- `SESSION_SECRET=`: Clave secreta utilizada para firmar y proteger las sesiones de usuario con express-session
- `PORT=`: Especifica el puerto en el correra la aplicación
- `EMAIL_USER=`: Usuario de gmail para usar mailer
- `EMAIL_PASS=`: Clave para aplicaciones de gmail

## Scripts para ejecutar la aplicacion

npm run start inicia el proyecto con el script standard en node

## Development con persistencia de datos en mongo

npm run start:development:mongo

## Development con persistencia de datos en memoria

npm run start:development:memory

## Production

npm run start:production:mongo

## QA

npm run start:test:mongo

## Se recomiendo checkear la documentación de la API

Para poder ver la documentación de swagger de la api ir a la url: `/api-docs`

Dentro de la documentación de swagger estan los endpoints mas importantes

Recomiendo empezar con la creacion de admin y usuario

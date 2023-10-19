const swaggerOpts = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Mi Proyecto',
        version: '1.0.0',
        description: 'Documentación de la API de Mi Proyecto',
      },
    },
    apis: ['./src/docs/**/*.yml'],
  };
  
  export default swaggerOpts;
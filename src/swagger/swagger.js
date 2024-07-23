

const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: ' product REST API SERVER',
            version: '1.0.0',
            description: 'product API with express',
        },
        servers: [
            {
                url: 'http://example.com/',
            },
        ],
    },
    apis: ['swagger.yaml'],
};

const outputFile = "./swagger-output.json";	// 같은 위치에 swagger-output.json을 만든다.
const endpointsFiles = [
    "../router.js"					// 라우터가 명시된 곳을 지정해준다.
];

swaggerAutogen(outputFile, endpointsFiles, options);
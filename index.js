require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./src/routes/router');
const bodyParser = require('body-parser');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API 문서',
            version: '1.0.0',
            description: 'API 설명',
        },
    },
    apis: ['./src/routes/*.js'], // API 라우트 파일 위치
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON 형식의 데이터 처리
app.use(bodyParser.json());
// URL 인코딩 된 데이터 처리
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터를 애플리케이션에 등록
app.use('/', router);

// 서버 시작
app.listen(port, () => {
    console.log(`웹서버 구동... ${port}`);
});
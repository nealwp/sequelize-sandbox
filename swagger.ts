import swaggerAutogen from "swagger-autogen";
import packageJson from "./package.json";

const info = {
    version: packageJson.version,
    title: 'Sequelize+Express Sandbox',
    description: 'Using Sequelize for Fun and Profit',
};

const servers = [{ url: 'http://localhost:3000', description: 'localhost' }];

const components = { 
    securitySchemes: { 
        bearerAuth: { 
            type: 'http', 
            scheme: 'bearer' 
        }
    }
};

const doc = { info, servers, components };
const outputFile = './swagger.json';
const endpointsFile = ['./src/router.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFile, doc);

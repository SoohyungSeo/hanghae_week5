
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = [
  "./routes/*.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);
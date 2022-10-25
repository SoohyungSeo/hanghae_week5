const express = require("express"); // express에서 제공되는 Router 함수를 사용해 Router 생성 **거의 디폴트값으로 쓰는것
const app = express(); 
const router = require("./routes");

app.use(express.urlencoded({ extended: true })); 
app.use(express.json(), router); 

const swaggerFile = require('./swagger/swagger-output');
const swaggerUi = require('swagger-ui-express')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {explorer:true}))

app.listen(3000, () => {
    console.log("서버가 3000포트로 열렸습니다.");
});

// npm init
require('dotenv').config(); // npm install dotenv
const cors = require('cors')

const express = require('express'); // npm install express
const app = express();

app.use(cors())

const studentRouter = require('./routes/studentRouter'); // Importando as rotas user
app.use('/student', express.json(), studentRouter);


app.use('/', (req, res) =>{ 
    res.send("Página inicial");
});

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor Ligado na porta: ${process.env.PORT}`);
})


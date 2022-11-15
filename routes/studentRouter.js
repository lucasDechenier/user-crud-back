const express = require('express'); // Utilizar o express 
const router = express.Router(); // Utilizar o router
const studentController = require('../controllers/studentController') // Importando os controladores

// Conectando o banco de dados
const mongoose = require('mongoose'); // npm install mongoose
mongoose.connect(process.env.MONGO_CONECTION_URL, 
  {useNewUrlParser:true, useUnifiedTopology:true}, (erro)=>{
      if(erro){
          console.log(erro);
      }else{
          console.log("Banco de dados conectado"); 
      }
  }
);

router.post('/', studentController.create);
router.get('/', studentController.list);
router.get('/approved', studentController.approved);
router.get('/disapproved', studentController.disapproved);
router.get('/recovery', studentController.recovery);
router.get('/:id', studentController.show);
router.delete('/:id', studentController.delete)
router.put('/:id', studentController.update)

module.exports = router;
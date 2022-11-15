const Student = require('../models/Student')

studentController = {
  // Responsável por criar um aluno
  create: async (req, res) => {
    const selectedStudent = await Student.findOne({
      name: req.body.name
    })
    if (selectedStudent) return res.status(400).send({message: 'Aluno com mesmo nome já criado'})
    const {firstNote, secondNote, name} = req.body
    const average = (firstNote + secondNote) / 2.0

    let situation = ''

    if(average >= 7) situation = 'approved'
    else if(average >=4) situation = 'recovery'
    else situation = 'disapproved'


    const student = new Student({
      name: name,
      firstNote: firstNote || 0,
      secondNote: secondNote || 0,
      situation: situation,
      average: average
    })

    try {
      const savedStudent = await student.save();
      res.send(savedStudent);
    } catch (error) {
      res.status(500).send({
        message: "Erro ao tentar criar o aluno",
        error: error
      });
    }
  },

  list: async (req, res) => {
    try {
      const students = await Student.find({})
      res.send(students);
    }catch (error) {
      res.status(500).send({
        message: "Erro ao tentar listar os alunos",
        error: error
      });
    }
  },

  approved: async (req, res) => {
    try {
      const students = await Student.find({situation: 'approved'})
      res.send(students);
    }catch (error) {
      res.status(500).send({
        message: "Erro ao tentar listar os alunos",
        error: error
      });
    }
  },

  disapproved: async (req, res) => {
    try {
      const students = await Student.find({situation: 'disapproved'})
      res.send(students);
    }catch (error) {
      res.status(500).send({
        message: "Erro ao tentar listar os alunos",
        error: error
      });
    }
  },


  recovery: async (req, res) => {
    try {
      const students = await Student.find({situation: 'recovery'})
      res.send(students);
    }catch (error) {
      res.status(500).send({
        message: "Erro ao tentar listar os alunos",
        error: error
      });
    }
  },

  show: async (req, res) => {
    let student = null
    const { id } = req.params
    try {
      student = await Student.findById(id)
    }catch (error) {
      return res.status(500).send({
        message: "Erro ao tentar buscar o aluno de id = " + id,
        error: error
      });
    }

    if(!student) return res.status(404).send({message: 'Aluno não encontrado'})

    return res.send(student);
  },

  delete: async (req, res) => {
    let student = null
    const { id } = req.params
    try {
      student = await Student.findById(id)
    }catch (error) {
      return res.status(500).send({
        message: "Erro ao tentar buscar o aluno de id = " + id,
        error: error
      });
    }

    if(!student) return res.status(404).send({message: 'Aluno não encontrado'})

    try {
      await Student.remove(student);
      res.send(id)
    } catch (error) {
      res.status(500).send({
        message: "Erro ao tentar apagar o aluno de id = " + id,
        error: error
      });
    }
  },

  update: async (req, res) => {
    const { id } = req.params
    const {firstNote, secondNote, name} = req.body
    const selectedStudent = await Student.findOne({
      name: req.body.name
    })
    console.log(id)
    if (selectedStudent && selectedStudent._id.toString() !== id) return res.status(400).send({message: 'Aluno com mesmo nome já criado'})

    const average = (firstNote + secondNote) / 2.0
    let situation = ''

    if(average >= 7) situation = 'approved'
    else if(average >=4) situation = 'recovery'
    else situation = 'disapproved'

    Student.findByIdAndUpdate(id, {name, firstNote, secondNote, situation, average}, {returnDocument:'after'}, (error, student) => {
      if(error){
        return res.status(500).send({
          message: "Erro ao tentar atualizar o aluno de id = " + id,
          error: error
        });
      }else{
        if (!student) {
          res.status(404).send({
            message: `Não foi possível atualizar o aluno de id = ${id}. Talvez o aluno não tenha sido encontrado`
          });
        } else res.send(student);
      }
    })
  },
}

module.exports = studentController;
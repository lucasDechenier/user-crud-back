// Criando um esquema que depois será guardado no banco de dados

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {type:String, required: true, minlength: 0, maxlength: 50},
    firstNote: {type: Number, required: true, min: 0, max: 10 },
    secondNote: {type: Number, required: true, min: 0, max: 10 },
    situation: {type: String, required: true, lowercase: true, trim: true},
    average: {type: Number, required: true, min: 0, max: 10 },
},{timestamps: true})

module.exports = mongoose.model('Student', studentSchema);
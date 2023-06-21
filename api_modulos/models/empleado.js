const {Schema, model} = require('mongoose')

const EmpleadoSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El campo nombre es requerido'],
            unique: [true]
        },

        documento: {
            type: Number,
            required: [true, 'La documento es obligatoria'],
        },

        cargo: {
            type: String,
            required: [true, 'El campo cargo es requerido'],
        },

        
    }
)

module.exports = model('Empleado', EmpleadoSchema) //Exportar el modelo
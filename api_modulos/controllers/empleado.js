//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Empleado = require('../models/empleado') // la importación de modelos no se instancia con llaves para evitar errores

//Consultar
const empleadoGet = async(req, res = response) => {
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const empleados = await Empleado.find() // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        empleados
    })
}

//Registrar o insertar
const empleadoPost = async(req,res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)

    try {
        const empleado = new Empleado(body) //Instanciar el objeto
        await empleado.save()
        mensaje = 'El empleado se creo exitosamente'
    } catch (error) {
            if(error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } else if (error.name === 'MongoError' || error.code === 11000){
                mensaje = 'El nombre del empleado ya existe'
            } else {
                console.error('Ocurrió un error al crear el empleado:', error.message);
                mensaje = 'Ocurrió un error al crear el empleado';
            }
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const empleadoPut = async(req,res = response) => {
  
    const {nombre,documento,cargo} = req.body
    let mensaje = ''

    try {
        const empleado = await Empleado.findOneAndUpdate({nombre: nombre},{documento: documento,cargo: cargo}) //Buscar por el nombre y modificar
        mensaje = 'El empleado se actualizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al actualizar el empleado'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminar
const empleadoDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const empleado = await Empleado.deleteOne({_id: _id}) //Buscar por el id y eliminar el registro
        mensaje = 'El empleado se elimino exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al eliminar el empleado'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    empleadoGet,
    empleadoPost,
    empleadoPut,
    empleadoDelete
}
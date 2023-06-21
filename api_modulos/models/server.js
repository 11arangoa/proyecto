const express = require('express')
const { dbConnection } = require('../database/config')
const cors = require('cors')//implementar seguridad
const bodyParser = require('body-parser')//recibir datos de formularios html

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT//capturando variable
        
        this.empleadoPath = '/api/empleado'//ruta publica
       
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json())
    }

    routes(){
        
        
        this.app.use(this.empleadoPath, require ('../routes/empleados'))
        
       
    }

    async conectarDB(){ //async para trabajar de manera asincronica 
        await dbConnection() //Esperar la respuesta del servidor
    }
}

module.exports = { Server } // si uso llaves en el index tmabien debo crear el objeto con llaves
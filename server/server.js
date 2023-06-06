const express = require('express')
const agendaRouter = require('./routes/agenda')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            agenda:"/api/v1/agenda",
        }
        this.middleware()
        this.routes()
    }

    routes(){
        this.app.use(this.paths.agenda, agendaRouter)
    }

    middleware(){
        this.app.use(cors())//Habilita Origen Cruzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }
}

module.exports = Server
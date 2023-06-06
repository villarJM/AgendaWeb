const { request, response } = require("express");
const pool = require("../db/connection");
const modelDiary = require("../models/agenda");
const bcrypt = require("bcryptjs")

const signIn = async (req = request, res = response) => {
    const {user, pass} = req.body
    console.log(user,pass)
    if(!user || !pass){
        res.status(400).json({msg: "Faltan Datos."})
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userq] = await conn.query(modelDiary.querySignIn, [user], (error) => {if(error) throw error})
        
        if(!userq){
            res.status(403).json({msg:"El usuario o contraseña que se ingresó no son válidos."})
            return
        }
        console.log(userq.password)
        const passwordValid = bcrypt.compare(pass, userq.password)
        if (!passwordValid) {
            res.status(403).json({msg:"El usuario o contraseña que se ingresó no son válidos."})
            return
        }
        res.send({token:`${userq.token}`})
        // res.json({msg:`El usuario se ha autenticado correctamente.`})
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const addPatient = async (req = request, res = response) => {
    const {firstname, surname, gender, birth, email, phone, direction, date, time} = req.body;
    console.log(firstname, surname, gender, birth, email, phone, direction, date, time);
    if(!firstname || !surname || !gender || !birth || !email || !phone || !direction || !date || !time){
        res.status(400).json({msg: "Faltan Datos."})
        return
    }
    
    let conn, newtime;
    
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        const [checkPatient] = await conn.query(modelDiary.queryPatientExists, [firstname, surname], (error) => {if(error) throw error})
        if(checkPatient){
            res.status(404).json({msg: `El paciente ya está Registrado.`})
            return
        }
        if (time >= '13:00:00') {
            newtime = time.toString().slice(0,2).concat(':00:00 pm');
            console.log(newtime);
        } else {
            newtime = time.toString().slice(0,2).concat(':00:00 am');
            console.log(newtime)
        }
        const [IDevent] = await conn.query(modelDiary.queryEventdayExists, [date, newtime]);
        if(IDevent){
            res.status(404).json({msg: `Día y Hora Reservado`})
            return
        }
        registerEventday = await conn.query(modelDiary.queryAddEventday, [date, newtime], (error) => {if(error) throw error});
        const [ID] = await conn.query(modelDiary.queryEventdayExists, [date, newtime]);
        console.log(ID.IDd);
        register = await conn.query(modelDiary.queryAddPatient, [firstname, surname, gender, birth, email, phone, direction, ID.IDd]);
        
        if (register.affectedRows === 0 && registerEventday.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo registrar el paciente con el nombre: ${firstname}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el paciente con nombre ${firstname}`})
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}
const getPatient = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()

        const checkPatient = await conn.query(modelDiary.queryGetPatient, (error) => {if(error) throw error})

        if(!checkPatient){
            res.status(404).json({msg: `Ningún Paciente Registrado.`})
            return
        }
        res.json(checkPatient)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const getTime = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()
        
        const checktime = await conn.query(modelDiary.queryGetTime,(error) => {if(error) throw error})

        if(!checktime){
            res.status(404).json({msg: `Ninguna hora registrada.`})
            return
        }
        res.json(checktime)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const addUser = async (req = request, res = response) => {
    
    const {name, surname, email, user, pass} = req.body//URI params
    if(!name || !surname || !email || !user || !pass){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    // const salt = bcryptjs.genSaltSync()
    // const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

    let conn;

    try {

        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modelDiary.queryUserExists, [user, pass], (error) =>{if(error) throw error})
        
        if (userExist) {
            res.json({msg:`El Usuario: '${user}' ya se encuentra registrado.`})
            return
        }
        //generamos la consulta
        var rand = function() {
            return Math.random().toString(36).substring(2); // remove `0.`
        };
        
        const token = () => {
            return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
        }
        
        const result = await conn.query( modelDiary.queryAddUser, [name, surname, email, user, pass, token()], (error) => {if(error) throw error})
        
        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${name}`})
            return
        }

        res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${name}`})//Se manda la lista de usuarios
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const getUsers = async (req = request, res = response) => {
    let conn

    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const users = await conn.query("SELECT * FROM users", (error) => {if(error) throw error})

        if (users.length === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: "No exiten usuarios registrados"})
            return
        }

        res.json(users)//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const getCountRegiterPatient = async (req = request, res = response) => {
    let conn, cont;
    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const patient = await conn.query(modelDiary.queryGetCountPatient, (error) => {if(error) throw error})
        const count = patient[0].count;
        console.log(parseInt(count.toString()));
        if (patient.length === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: "No exiten pacientes registrados"})
            return
        }

        res.json({count: count.toString()})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}
const getCountRegiterUser = async (req = request, res = response) => {
    let conn, cont;
    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const patient = await conn.query(modelDiary.queryGetCountUser, (error) => {if(error) throw error})
        const count = patient[0].count;
        console.log(parseInt(count.toString()));
        if (patient.length === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: "No exiten pacientes registrados"})
            return
        }

        res.json({count: count.toString()})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}
module.exports = {signIn, addPatient, getPatient, getTime, addUser, getUsers, getCountRegiterPatient, getCountRegiterUser}
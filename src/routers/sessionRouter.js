import {Router} from "express"
import userModel from "../models/userModel.js"

const sessionRouter = Router()

sessionRouter.post("/register", async (req,res,next) => {
    try {
        const {firstName, lastName, email, age, password} = req.body
        const existe = await userModel.findOne({email})
        if(existe) {return res.status(400).send({status: "error", error: "Este mail ya esta registrado"})}
        const user = {
            firstName,
            lastName,
            email,
            age,
            password
        }
        let result = await userModel.create(user)
        console.log(result)
        res.send({status: "success", message: "Usuario Registrado!"})
    } catch (error) {
        next(error)
    }
})

sessionRouter.post("/login", async (req,res,next) => {
    try {
        const {email,password} = req.body
        const rol = "admin"
        if(email == "adminCoder@coder.com" && password == "adminCod3r123"){req.session.user = {
            firstName: "coderhouse",
            email: email,
            password: password,
            rol: rol,
        }}
        const user = await userModel.findOne({email,password})
        if(!user){return res.status(400).send({status: "error", error: "no existe ese mail o la contraseña es incorrecta"})}

        req.session.user = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            rol: user.rol
        }
        res.send({status: "success", message: "Logueo correcto!", payload: req.session.user})
    } catch (error) {
        next(error)
    }
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
        res.redirect('/login')
    })
})

export default sessionRouter
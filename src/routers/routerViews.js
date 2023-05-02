import {Router} from "express"
import { logueadosRedirect } from "../middlewares/logueados.js"
import { productManager } from "../dao/productManager.js";

const router = Router()

router.get("/registro", (req,res,next) => {
    res.render("register", {pageTitle: "Registro"})
})

router.get("/login", (req,res,next) => {
    res.render("login", {pageTitle: "Login"})
})

router.get("/", logueadosRedirect, (req,res,next) => {
    res.redirect("/user")
})

router.get("/user",logueadosRedirect, (req,res,next) => {
    res.render("user", {pageTitle: "User", user: req.session.user})
    console.log(req.session.user)
})

router.get("/realtimeproducts", async (req,res) => {
    const productos = await productManager.encontrar()
    res.render("realTimeProducts", {hayProductos: productos.length > 0, productos})
})

export default router
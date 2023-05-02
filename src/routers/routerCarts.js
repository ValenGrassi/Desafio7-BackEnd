import { Router } from "express";
import { cartPostController } from "../controllers/api/cartPostController.js";
import { cartManager } from "../dao/cartManager.js";

export const routerCarts = Router();
routerCarts.post("/", cartPostController);
routerCarts.get("/", async (req, res, next) => {
    try{
        const carritos = await cartManager.encontrar()
        res.status(201).json(carritos)
    }
    catch(error){
        next(error)
    }
}
)


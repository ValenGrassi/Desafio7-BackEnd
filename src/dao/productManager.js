import { ManagerMongoose } from "./ManagerMongoose.js"

export const productManager = new ManagerMongoose("products", {
        status: {type: Boolean ,required: true},
        thumbnail: {type: String ,required: true}, 
        title: {type: String ,required: true}, 
        description: {type: String ,required: true}, 
        price: {type: Number ,required: true}, 
        code: {type: Number ,required: true}, 
        stock: {type: Number ,required: true}, 
        category: {type: String ,required: true} 
})


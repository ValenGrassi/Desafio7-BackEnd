import { ManagerMongoose } from "./ManagerMongoose.js"

export const cartManager = new ManagerMongoose("carts", {
    id: {type: Array ,required: true},
    products: {type: Array}
})
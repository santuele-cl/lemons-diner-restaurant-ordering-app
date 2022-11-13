import { orderList } from "./script.js"
export const pizzaOrder = []
export const hamburgerOrder = []
export const beerOrder = []

export function orderNumberCounter() {
    orderList.forEach( function(order){
        if ( order.uuid === "8c563332-3315-4eea-80d8-4e11f27f461a") {
            pizzaOrder.push(order)
        }
        else if (order.uuid === "6f806808-002c-44c9-8188-baa866eaa9b7") {
            hamburgerOrder.push(order)
        } 
        else if (order.uuid === "d7518fb0-cc32-4cec-8a33-3657acc9b523") {
            beerOrder.push(order)
        }
    })
}

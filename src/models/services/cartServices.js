const CartDaos = require('../daos/cartDaos');

let instanceCartService = [];

class CartServices {
    constructor() {
        this.CartDaos = new CartDaos()
        this.value = Math.random()
    }
    //**************************** SINGLETON ****************************** */
    static getInstance() {
        if(!instanceCartService){
            instanceCartService = new CartServices()
        }
        return instanceCartService
    }
    //**************************** SINGLETON ****************************** */

    async getServices(){
        let carts = await this.CartDaos.getCart()
        return carts    
    }
    async getServiceById(id){
        let cart
        if(id){
            cart = await this.CartDaos.getCartByIdDB(id)
        } else {
            cart = await this.CartDaos.getCart()
        }
        return cart
    }
    async saveService(dataObj){
        let cart = await this.CartDaos.saveData(dataObj)
        return cart
    }
    async addProdService(id, dato){
        let cart = await this.CartDaos.addProduct(id, dato)
        return cart
    }
    async updateService(id, dato){
        let cart = await this.CartDaos.updateData(id, dato);
        return cart
    }
    async deleteService(id){
        let cart = await this.CartDaos.deleteData(id)
        return cart
    }
    async closeService(id){
        let cart = await this.CartDaos.closeData(id)
        return cart
    }
}


module.exports = CartServices
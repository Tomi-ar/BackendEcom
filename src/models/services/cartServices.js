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

    async getService(){
        let carts = await this.CartDaos.getData()
        return carts    
    }
    async getServiceById(id){
        let cart
        if(id){
            cart = await this.CartDaos.getByIdDB(id)
        } else {
            cart = await this.CartDaos.getData()
        }
        return cart
    }
    async saveService(dataObj){
        let cart = await this.CartDaos.saveData(dataObj)
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
}


module.exports = CartServices
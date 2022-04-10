const { cartDAO } = require('../containers/index');
let instanceCartDaos = [];

class CartDaos{
    constructor(){
        this.value = Math.random()
    }

    //**************************** SINGLETON ****************************** */
    static getInstance() {
        if(!instanceCartDaos){
            instanceCartDaos = new CartDaos()
        }
        return instanceCartDaos
    }
    //**************************** SINGLETON ****************************** */


    async getData(){
        let data = await cartDAO.getAll()
        return data
    }
    async getByIdDB(id){
        let data = await cartDAO.getById(id)
        return data
    }
    async saveData(dataObj){
        let data = await cartDAO.saveCart(dataObj)
        return data
    }     
    async updateData(id, dato){
        let data = await cartDAO.updateId(id, dato)
        return data
    }
    async deleteData(id){
        let data = await cartDAO.deleteId(id)
        return data
    }
}

module.exports = CartDaos;
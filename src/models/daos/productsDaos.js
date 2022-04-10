const { productDAO } = require('../containers/index');
let instanceProdDaos = [];

class ProductDaos{
    constructor(){
        this.value = Math.random()
    }

    //**************************** SINGLETON ****************************** */
    static getInstance() {
        if(!instanceProdDaos){
            instanceProdDaos = new ProductDaos()
        }
        return instanceProdDaos
    }
    //**************************** SINGLETON ****************************** */


    async getData(){
        let data = await productDAO.getAll()
        return data
    }
    async getByIdDB(id){
        let data = await productDAO.getById(id)
        return data
    }
    async saveData(dataObj){
        let data = await productDAO.save(dataObj)
        return data
    }
    async updateData(id, dato){
        let data = await productDAO.updateId(id, dato)
        return data
    }
    async deleteData(id){
        let data = await productDAO.deleteId(id)
        return data
    }
}

module.exports = ProductDaos;
const getData = require("./helpers/getData");
const writeData = require("./helpers/writeData");
const config = require('../config')

const today = new Date(Date.now());

class ContenedorFS {
    constructor(ruta){
        this.ruta = `${config.fileSystem.path}/${ruta}`;
        this.elem = []
    }

    
    async save(obj) {
        let dataFile = await getData(this.ruta);
        if (dataFile.length > 0) {
            let items = dataFile.length;
            obj.id = dataFile[items - 1].id + 1;
            obj.timeStamp = today;
            // obj.producto = [];
            dataFile.push(obj);
            this.elem = dataFile;
            writeCartFile(this.ruta, this.elem);
            console.log('Objeto guardado con éxito');
        } else {
            obj.id = 1;
            obj.timeStamp = today;
            // obj.producto = [];
            this.elem.push(obj);
            writeCartFile(this.ruta, this.elem);
        }
    }

    async getAll() {
        try{
            let dataFile = await getData(this.ruta)
            console.log(dataFile);
        }
        catch (err) {
        console.log("Error al obtener todos: ", err)
        }
    }
        
    async getById(id) {
        try {
            let dataFile = await getData(this.ruta)
            dataFile.find(item => item.id === id) !== undefined ? result = dataFile.filter(item => item.id === id) : null;
            return result.products
            // or return results
            } 
        catch (err) {
            console.log("Error al obtener el objeto: ", err)
        }
    }

    async deleteId(id) {
        try{
            let dataFile = await getData(this.ruta)
            const newProducts = dataFile.filter(item => item.id !== id)
            // para sobreescribir el archivo
            await writeData(this.ruta, newProducts);
            console.log("Objeto eliminado");
            }
        catch (err) {
            console.log("Error al elimiar el id: ", err);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
    // para products
    async updateId(id, product) {
        try {
            let dataFile = await getData(this.ruta)
            dataFile.find(item => item.id === id) !== undefined ? indx = dataFile.map(item => item.id).indexOf(id) : null
            dataFile[indx] = product;
            await writeData(this.ruta, dataFile);
        } catch (err) {
            console.log("Error al obtener el producto: ", err)
        }   
    }

    // para carrito - ESTO IRIA EN EL DAO DE CARRITOS SOLAMENTE
    // async deleteProduct(id, idProduct) {
    //     try {
    //         let dataFile = await getData(this.ruta)
    //         dataFile.find(item => item.id === id) !== undefined ? middle = dataFile.filter(item => item.id === id) : null;
    //         const result = middle.filter(item => item.id !== idProduct)
    //         await writeData(this.ruta, result);
    //         console.log("Producto eliminado del carrito");
    //         } 
    //     catch (err) {
    //         console.log("Error al elminar el producto del carrito: ", err)
    //     } 
    // }

    // para carrito - ESTO IRIA EN EL DAO DE CARRITOS SOLAMENTE
    // async addProduct(id, arr) {
    //     try {
    //         let dataFile = await getData(this.ruta)
    //         dataFile.find(item => item.id === id) !== undefined ? result = dataFile.filter(item => item.id === id) : null;
    //         result.push(arr);
    //         writeCartFile(this.ruta, dataFile);
    //         console.log('Producto agregado al carrito con éxito');
    //         } 
    //     catch (err) {
    //         console.log("Error al obtener el producto: ", err)
    //     } 
    // }
}

module.exports = ContenedorFS
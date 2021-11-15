const getData = require("./helpers/getData");
const writeData = require("./helpers/writeData");

const today = new Date(Date.now());

class Cart {
    constructor() {
        this.cart = [];
    }

    async save(cart) {
        let dataFile = await getData('./db/cart.txt');
        if (dataFile.length > 0) {
            let items = dataFile.length;
            product.id = dataFile[items - 1].id + 1;
            product.timeStamp = today;
            cart.producto = [];
            dataFile.push(cart);
            this.cart = dataFile;
            writeCartFile('./db/cart.txt', this.cart);
            console.log('Carrito guardado con éxito');
        } else {
            cart.id = 1;
            cart.timeStamp = today;
            cart.producto = [];
            this.cart.push(cart);
            writeCartFile('./db/cart.txt', this.cart);
        }
    }

      async getById(id) {
        try {
            let dataFile = await getData('./db/cart.txt')
            dataFile.find(item => item.id === id) !== undefined ? result = dataFile.filter(item => item.id === id) : null;
            return result.products    
            } 
        catch (err) {
            console.log("Error al obtener el producto: ", err)
            } 
        }

    //   async getAll() {
    //     try{
    //         let dataFile = await getData('./db/cart.txt')
    //         return dataFile;
    //     }
    //     catch (err) {
    //         console.log("Error al obtener todos: ", err)
    //     }
    //   }
    
    
      async addProduct(id, arr) {
        try {
            let dataFile = await getData('./db/cart.txt')
            dataFile.find(item => item.id === id) !== undefined ? result = dataFile.filter(item => item.id === id) : null;
            result.push(arr);
            writeCartFile('./db/cart.txt', dataFile);
            console.log('Producto agregado al carrito con éxito');
            } 
        catch (err) {
            console.log("Error al obtener el producto: ", err)
            } 
        }
    
      async deleteId(id) {
        try{
            let dataFile = await getData('./db/cart.txt')
            const newCarts = dataFile.filter(item => item.id !== id)
            // para sobreescribir el archivo
            await writeData('./db/cart.txt', newCarts);
            console.log("Carrito eliminado");
            }
        catch (err) {
            console.log("Error al elimiar el carrito id: ", err);
            }
        }
    
      async deleteProduct(id, idProduct) {
        try {
            let dataFile = await getData('./db/cart.txt')
            dataFile.find(item => item.id === id) !== undefined ? middle = dataFile.filter(item => item.id === id) : null;
            const result = middle.filter(item => item.id !== idProduct)
            await writeData('./db/cart.txt', result);
            console.log("Producto eliminado del carrito");
            } 
        catch (err) {
            console.log("Error al elminar el producto del carrito: ", err)
        } 
     
    }
    
}
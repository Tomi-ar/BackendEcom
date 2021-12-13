// const getData = require("./helpers/getData");
// const writeData = require("./helpers/writeData");

// const today = new Date(Date.now());

// class Contenedor {
//     constructor() {
//         this.pr = [];
//     }

//     async save(product) {
//         let dataFile = await getData('./db/products.txt')
//         if (dataFile.length > 0) {
//             let items = dataFile.length;
//             product.id = dataFile[items - 1].id + 1;
//             product.timeStamp = today;
//             dataFile.push(product);
//             this.pr = dataFile;
//             writeData('./db/products.txt', this.pr);
//             console.log("Producto guardado con éxito");
//         } else {
//             product.id = 1;
//             this.pr = [{...product, id:product.id, timeStamp=today}]
//             console.log("Primer producto guardado");
//             // cheuqear si puede hacer push a algo que no existe
//             writeData('./db/products.txt', this.pr)
//         }
//     }

//     async getById(id) {
//         try {
//             let dataFile = await getData('./db/products.txt')
//             dataFile.find(item => item.id === id) !== undefined ? result = dataFile.filter(item => item.id === id) : null;
//             return result    
//         } catch (err) {
//             console.log("Error al obtener el producto: ", err)
//         }        
//     }
    
//     async getAll() {
//         try{
//             let dataFile = await getData('./db/products.txt')
//             console.log(dataFile);
//         }
//         catch (err) {
//             console.log("Error al obtener todos: ", err)
//         }
//     }
    
//     async deleteId(id) {
//         try{
//             let dataFile = await getData('./db/products.txt')
//             const newProducts = dataFile.filter(item => item.id !== id)
//             // para sobreescribir el archivo
//             await writeData('./db/products.txt', newProducts);
//             console.log("Producto eliminado");
//             }
//         catch (err) {
//             console.log("Error al elimiar el id: ", err);
//         }
//     }

//     async updateId(id, product) {
//         try {
//             let dataFile = await getData('./db/products.txt')
//             dataFile.find(item => item.id === id) !== undefined ? indx = dataFile.map(item => item.id).indexOf(id) : null
//             dataFile[indx] = product;
//             await writeData('./db/products.txt', dataFile);
//         } catch (err) {
//             console.log("Error al obtener el producto: ", err)
//         }   
//     }
// }

// module.exports = Contenedor;
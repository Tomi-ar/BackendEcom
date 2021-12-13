const today = new Date(Date.now());

class ContenedorMemoria {
    constructor() {
        this.elementos = [];
    }

    save(obj) {
        let newId
        let timeStamp
        if (this.elementos.length == 0) {
            newId = 1
            timeStamp = today;
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
            timeStamp = today;
        }
        const newElem = { ...obj, id: newId }
        this.elementos.push(newElem)
        return newElem
    }
    getAll(){
        return [...this.elementos]
    }
    getById(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        if (!elem) {
            throw new Error(`ID del objeto no encontrado`)
        } else {
            return elem
        }
    }
    deleteId(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: id no encontrado`)
        } else {
            return this.elementos.splice(index, 1)
        }
    }
    deleteAll(){
        this.elementos = []
    }
    updateId(id, product) {
        const index = this.elementos.findIndex(x => x.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            this.elementos[index] = product
            return product
        }
    }
    // para carrito - ESTO IRIA EN EL DAO DE CARRITOS SOLAMENTE
    // deleteProduct(id, idProduct) {
    //     const middle = this.elementos.find(x => x.id == id)
    //     const index = middle.findIndex(x => x.id == idProduct)
    //     if (index == -1) {
    //         throw new Error(`Error al borrar: id no encontrado`)
    //     } else {
    //         return this.elementos.splice(index, 1)
    //     }
    // }

    // para carrito - ESTO IRIA EN EL DAO DE CARRITOS SOLAMENTE
    // addProduct(id, arr) {

    // }
}

export default ContenedorMemoria 
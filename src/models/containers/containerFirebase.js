const admin = require('firebase-admin');
const config = require("../config/config.js");

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL:"http://backend-coder-9b544.firebaseio.com"
})

const db = admin.firestore();
let instanceProdFirebase = []

class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
        this.value = Math.random()
    }

    //**************************** SINGLETON ****************************** */
    static getInstance() {
        if(!instanceProdFirebase){
            instanceProdFirebase = new ContenedorFirebase()
        }
        return instanceProdFirebase
    }
    //**************************** SINGLETON ****************************** */

    async save(obj) {
        try {
            const saved = await this.coleccion.add(obj);
            return { ...obj, id: saved.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    async getAll(){
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }
    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`No se encontró el id: ${id}`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar id: ${error}`)
        }
    }
    async deleteId(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
    async updateId(id, obj) {
        try {
            const updated = await this.coleccion.doc(id).set(obj);
            return updated
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }
    // async deleteProduct(id, idProduct) {

    // }
    // async addProduct(id, arr) {

    // }
}

module.exports = ContenedorFirebase
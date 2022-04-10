const logger = require('../../../loggers/logger')
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
            logger.log("error", error.message)
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
            logger.log("error", error.message)
        }
    }
    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                logger.log("error", error.message)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async deleteId(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            logger.log("error", error.message)
        }
    }
    async updateId(id, obj) {
        try {
            const updated = await this.coleccion.doc(id).set(obj);
            return updated
        } catch (error) {
            logger.log("error", error.message)
        }
    }
}

module.exports = ContenedorFirebase
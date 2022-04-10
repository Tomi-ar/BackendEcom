const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const dataBase = argv._[0]
let productDAO
let cartDAO

switch (dataBase){
    case 'firebase':
        const ProductDaoFirebase = require("./productos/productsDaoFirebase");
        const CartDaoFirebase = require("./carritos/cartDaoFirebase");

        productDAO = new ProductDaoFirebase()
        cartDAO = new CartDaoFirebase()
        break;
    default:
        const ProductDaoMongo = require("./productos/productsDaoMongo");
        const CartDaoMongo = require("./carritos/cartDaoMongo");

        productDAO = new ProductDaoMongo()
        cartDAO = new CartDaoMongo()
        break;
}


module.exports = {productDAO, cartDAO, dataBase };
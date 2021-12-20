let productDAO;
let cartDAO;
let method

switch (method){
    case 'json':
        const ProductDaoFS = require("./productos/productsDaoFS");
        const CartDaoFS = require("./carritos/cartDaoFS");

        productDAO = new ProductDaoFS()
        cartDAO = new CartDaoFS()
        break;
    case 'firebase':
        const ProductDaoFirebase = require("./productos/productsDaoFirebase");
        const CartDaoFirebase = require("./carritos/cartDaoFirebase");

        productDAO = new ProductDaoFirebase()
        cartDAO = new CartDaoFirebase()
        break;
    case 'mongodb':
        const ProductDaoMongo = require("./productos/productsDaoMongo");
        const CartDaoMongo = require("./carritos/cartDaoMongo");

        productDAO = new ProductDaoMongo()
        cartDAO = new CartDaoMongo()
        break;
    default:
        const ProductDaoMemory = require("./productos/productsDaoMemory");
        const CartDaoMemory = require("./carritos/cartDaoMemory");

        productDAO = new ProductDaoMemory()
        cartDAO = new CartDaoMemory()
        break;
}

module.exports = {productDAO, cartDAO};
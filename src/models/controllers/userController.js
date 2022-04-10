const logger = require('../../../loggers/logger')

const renderMain = async (req, res) => {
    res.render('main');
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const renderSignup = async (req, res) => {
    res.render('signup');
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const renderLogin = async (req, res) => {
    res.render('login', { message: false});
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const redirectProducts = async (req, res) => {
    res.send({message: "Redirect to products"});
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

const redirectLogout = async (req, res) => {
    res.logout();
    res.send({message: "Redirect to login"});
    logger.log("info", `${req.method}-${req.originalUrl}`);
}

module.exports = { renderMain, renderSignup, renderLogin, redirectProducts, redirectLogout};
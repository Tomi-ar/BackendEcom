const redirectProducts = async (req, res) => {
    res.send({message: "Redirect to products"});
}

const redirectLogout = async (req, res) => {
    res.logout();
    res.send({message: "Redirect to login"});
}

module.exports = {redirectProducts, redirectLogout};
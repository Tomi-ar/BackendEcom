const fs = require('fs');

const getData = async (file) => {
    try {
        const content = await fs.promises.readFile(file, 'utf-8');
        const products = await JSON.parse(content)
        return products
    } catch (err) {
        console.log("Error de lectura de archivo", err);
    }
}

module.exports = getData;
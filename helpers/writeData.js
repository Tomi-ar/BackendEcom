const fs = require('fs');

const writeData = async (file, products) => {
    try {
        await fs.promises.writeFile(file, JSON.stringify(products, null, 2), 'utf-8')
    } catch (err) {
        console.log("Error de escritura de archivo", err);
    }
}

module.exports = writeData;
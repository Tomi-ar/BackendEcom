const express = require("express");
const { fork } = require("child_process");
const { Router } = express;
const router = new Router();

router.get("/randoms", (req,res) => {
    let numeros = req.query.cant || 100000000

    const dependencies = { message: numeros};
    const nums = [JSON.stringify(dependencies)]

    const comp = fork("./random.js", nums);
    comp.send("generateRandom");

    comp.on("message", (data) => {
        res.send(data);
    });
})

module.exports = router
const express = require("express");

const router = express.Router();

const Info = require("../models/temp.js");

router.post("/save", async(req, res) => {
    const body = req.body;

    // const Snap = new Info({
    //     temp: body.temp,
    //     hum: body.hum,
    //     heatIndex: body.hi,
    // });

    // Snap.save()
    console.log(body);
    res.sendStatus(201);
});

module.exports = router;
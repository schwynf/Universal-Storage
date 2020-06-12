
const express = require("express");
const router = express.Router();
const axios = require('axios');


let generatorURL = "https://www.passwordrandom.com/query?command=password&format=json&count=1";
   
router.get("/api/generator",async(req,res)=>{

    try {
        axios
        .get(generatorURL)
        .then((data) => {
            res.json(data.data.char);
        })
        .catch((error) => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;
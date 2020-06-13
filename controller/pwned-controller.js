const express = require("express");
const router = express.Router();
const axios = require('axios');
const CryptoJs = require("crypto-js");


router.get("/api/pwned/:id", async (req,res) => {
  try {
    const hashed = CryptoJs.SHA1(req.params.id).toString()
    const firstFive = hashed.slice(0,5)
    const data = await axios.get(`https://api.pwnedpasswords.com/range/${firstFive}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": "0da9d7acd6fd4fd8935c22fa096d90e4"
      }
    });
    const resArr = data.data.split("\n")
    console.log(resArr.length)
    res.json(resArr)
    } catch (error) {
    console.error(error)
  }
});
module.exports = router;
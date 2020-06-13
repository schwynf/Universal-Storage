const express = require("express");
const router = express.Router();
const axios = require('axios');
const CryptoJs = require("crypto-js");

const pwnedKey = "0da9d7acd6fd4fd8935c22fa096d90e4";

router.get("/api/pwned/password/:id", async (req, res) => {
  try {
    const hashed = CryptoJs.SHA1(req.params.id).toString()
    const firstFive = hashed.slice(0, 5)
    const data = await axios.get(`https://api.pwnedpasswords.com/range/${firstFive}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": pwnedKey
      }
    });
    const resArr = data.data.split("\n")
    res.json(resArr)
  } catch (error) {
  }
});

router.get("/api/pwned/email/:id", async (req, res) => {
  try {
    const breaches = [];
    const data = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${req.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": pwnedKey
      }
    });

    res.json(data.data);
  } catch (error) {
    console.error(error)
  }
})
module.exports = router;
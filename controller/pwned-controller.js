const express = require("express");
const router = express.Router();
const axios = require("axios");
const CryptoJs = require("crypto-js");
const pwnedKey = process.env.API_KEY;
router.get("/api/pwned/password/:id", async (req, res) => {
  try {
    const hashed = CryptoJs.SHA1(req.params.id).toString();
    const firstFive = hashed.slice(0, 5);
    const rest = hashed.slice(5, hashed.length).toUpperCase();
    const data = await axios.get(`https://api.pwnedpasswords.com/range/${firstFive}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": pwnedKey
      }
    });
    const resArr = data.data.split("\n");
    for (let index = 0; index < resArr.length; index++) {
      const sliced = resArr[index].slice(0,35);
     if (sliced == rest) {
       return res.json(sliced);
     }
    }
    return res.json({match: "NO-MATCH"});
  } catch (error) {
    console.error(error);
  }
});
router.get("/api/pwned/email/:id", async (req, res) => {
  try {
    // const breaches = [];
    const data = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${req.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": pwnedKey
      }
    });
    res.json(data.data);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;

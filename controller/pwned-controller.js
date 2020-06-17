const express = require("express");
const router = express.Router();
const axios = require("axios");
const CryptoJs = require("crypto-js");
const pwnedKey = process.env.API_KEY;

router.post("/api/pwned/password", async (req, res) => {
  try {
    const data = await axios.get(`https://api.pwnedpasswords.com/range/${req.body.firstFive}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": pwnedKey
      }
    });
    const resArr = data.data.split("\n");
    for (let index = 0; index < resArr.length; index++) {
      const sliced = resArr[index].slice(0,35);
     if (sliced == req.body.rest) {
       return res.json({
         sliced: sliced,
          hashed: resArr[index],
          match: true
        });
     }
    }
    return res.json({match: false});
  } catch (error) {
    console.error(error);
  }
});
router.get("/api/pwned/email/:id", async (req, res) => {
  try {
    const data = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${req.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        "hibp-api-key": pwnedKey
      }
    });
    res.json(data.data);
  } catch (error) {
    res.json({})
    console.error(error);
  }
});
module.exports = router;

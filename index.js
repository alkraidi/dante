const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storeKey = "G-wagon63-Bently"; // Replace with your actual store key

app.post('/generate-hash', (req, res) => {
  console.log("Received request body:", req.body);

  const {
    amount,
    BillToCompany = "",
    BillToName = "",
    callbackUrl = "",
    clientid,
    currency,
    failUrl,
    hashAlgorithm = "ver3",
    Instalment = "",
    lang = "tr",
    okUrl,
    refreshtime = "",
    rnd,
    storetype = "3d_pay_hosting",
    TranType = "Auth"
  } = req.body;

  if (!amount || !clientid || !currency || !failUrl || !okUrl || !rnd) {
    console.error("Missing required fields.");
    return res.status(400).json({ error: "Cannot process your request. Required fields missing." });
  }

  try {
    const hashData = [
      amount,
      BillToCompany,
      BillToName,
      callbackUrl,
      clientid,
      currency,
      failUrl,
      hashAlgorithm,
      Instalment,
      lang,
      okUrl,
      refreshtime,
      rnd,
      storetype,
      TranType
    ].join('|');

    const finalString = `${hashData}|${storeKey}`;
    const hash = crypto.createHash('sha512').update(finalString, 'utf-8').digest('base64');

    console.log("Generated hash:", hash);

    res.send({ hash });
  } catch (err) {
    console.error("Error generating hash:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hash server running on port ${PORT}`);
});

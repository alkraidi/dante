const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔐 Replace this with your actual store key from İşbank
const storeKey = "your_store_key_here";

app.post('/generate-hash', (req, res) => {
  console.log("Received request body:", req.body);

  const {
    clientid,
    oid,
    amount,
    okUrl,
    failUrl,
    islemtipi,
    rnd
  } = req.body;

  // 🔒 Required field check
  if (!clientid || !oid || !amount || !okUrl || !failUrl || !islemtipi || !rnd) {
    return res.status(400).json({ error: "Missing required fields for hash generation." });
  }

  // 🔑 Official İşbank hash string structure
  const hashString = clientid + oid + amount + okUrl + failUrl + islemtipi + rnd + storeKey;

  // 🧮 Generate the hash
  const hash = crypto.createHash('sha512').update(hashString, 'utf-8').digest('base64');

  console.log("Generated hash:", hash);
  res.send({ hash });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Hash server running on port ${PORT}`);
});

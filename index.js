const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Replace this with your actual İşbank store key
const storeKey = "G-wagon63-Bently";

app.post('/generate-hash', (req, res) => {
  const { clientid, oid, amount, okUrl, failUrl, islemtipi, rnd } = req.body;

  if (!clientid || !oid || !amount || !okUrl || !failUrl || !islemtipi || !rnd) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const hashString = clientid + oid + amount + okUrl + failUrl + islemtipi + rnd + storeKey;
  const hash = crypto.createHash('sha512').update(hashString, 'utf-8').digest('base64');

  res.send({ hash });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hash server running on port ${PORT}`);
});


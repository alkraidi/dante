const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storeKey = "G-wagon63-Bently";

app.post('/generate-hash', (req, res) => {
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

  res.send({ hash });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hash server running on port ${PORT}`);
});
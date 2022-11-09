const crypto = require("crypto");
const fs = require("fs");

module.exports = function (document, filename) {
  const private_key = fs.readFileSync("keys/privateKey.pem", "utf-8");
  const doc = fs.readFileSync(document);

  const signer = crypto.createSign("RSA-SHA256");
  signer.write(doc);
  signer.end();

  const signature = signer.sign(private_key, "base64");

  fs.writeFileSync(`public/signature/${filename}.txt`, signature);
};

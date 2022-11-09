const crypto = require("crypto");
const fs = require("fs");

module.exports = function (signatureFile, file) {
  const public_key = fs.readFileSync("keys/publicKey.pem", "utf-8");

  const signature = fs.readFileSync(signatureFile, "utf-8");

  // File to be signed
  const doc = fs.readFileSync(file);

  // Signing
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.write(doc);
  verifier.end();

  // Verify file signature ( support formats 'binary', 'hex' or 'base64')
  return verifier.verify(public_key, signature, "base64");
};

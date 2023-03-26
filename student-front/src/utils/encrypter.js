import crypto from "crypto-js";

export default function encrypter(data) {
  const encodedWord = crypto.enc.Utf8.parse(data); // e
  var encoded = crypto.enc.Base64.stringify(encodedWord);
  encoded = encoded
    .replace(/\+/g, "p23S")
    .replace(/\//g, "sL3S4")
    .replace(/=/g, "e2uAl");
  return encoded;
}

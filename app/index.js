const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const qrcode = require('qrcode');
const fs = require("fs")

const signature = require("../sign");
const verify = require("../verify");

const multerConfig = require("./multer");

const app = express();

app.use(cors());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./app/views");

app.get("/", async (req, res) => {
  return res.render("index");
});

app.post("/upload", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname, filename, path: pathFile } = req.file;
  const [filenameFormat] = filename.split(".pdf");
  if (originalname) {
    signature(pathFile, filenameFormat);
    const signaturePath = fs.readFileSync(path.resolve(__dirname, "..", "public", "signature", `${filenameFormat}.txt`), 'utf-8');
    const qrcodeImg = await qrcode.toDataURL(signaturePath);

    return res.json({
      sucess: true,
      link_file: `http://localhost:3000/signature/${filenameFormat}.txt`,
      link_qrcode: qrcodeImg
    });
  }

  return res.status(400).json({ success: false, data: null });
});

app.get("/verify", (req, res) => {
  return res.render('verify')
});

app.post("/verify", multer().single("file"), async (req, res) => {
  const { originalname } = req.file;

  const files = fs.readdirSync(path.resolve(__dirname, "..", "public"));
  const removeFolders = files.filter(file => file.includes(".pdf"));

  const isFileSignature = removeFolders.filter(file => file === originalname.replace(".txt", ".pdf"));

  if (isFileSignature.length <= 0) {
    return res.status(200).json({ success: false, message: "Esta assinatura não foi assinada para nenhum arquivo" });
  }

  if (isFileSignature.length > 0) {
    const signaturePath = path.resolve(__dirname, "..", "public", "signature", originalname);
    const docPath = path.resolve(__dirname, "..", "public", originalname.replace(".txt", ".pdf"));
    
    const isVerify = verify(signaturePath, docPath)
    return res.status(200).json({ success: isVerify, message: isVerify ? "Esta assinatura é válida" : "Esta assinatura não é válida" });
  }

  return res.status(200).json({ success: isVerify, message: "Esta assinatura é válida" });
});

app.listen(3000, () => console.log("Server is running"));

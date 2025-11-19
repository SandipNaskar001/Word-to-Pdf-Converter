import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import docxConverter from "docx-pdf";
import path from "path";
import { fileURLToPath } from "url"; 
import fs from "fs"; 
import cors from 'cors'
const app = express();
dotenv.config();
app.use(cors({
  origin: "https://myproject-git-main-sandipnaskar001s-projects.vercel.app/"  
}));

const PORT = process.env.PORT || 3001;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("files")) fs.mkdirSync("files");


//storage creation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


app.post("/convertpdf", upload.single("file"), function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded, please upload a doc file",
      });
    }

  
    const outputFile = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );

    docxConverter(req.file.path, outputFile, function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: "Error converting file",
          error: err, 
        });
      }

      res.download(outputFile, () => {
        console.log("File downloaded successfully!");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello! Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

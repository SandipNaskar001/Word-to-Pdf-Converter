import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import docxConverter from "docx-pdf";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://myproject-git-main-sandipnaskar001s-projects.vercel.app",
  })
);

const PORT = process.env.PORT || 3001;

// Multer setup
const storage = multer.memoryStorage(); // store in memory
const upload = multer({ storage });

app.post("/convertpdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const tempDocPath = path.join("uploads", req.file.originalname);
    fs.writeFileSync(tempDocPath, req.file.buffer);

    const outputFile = path.join("uploads", `${req.file.originalname}.pdf`);

    docxConverter(tempDocPath, outputFile, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Conversion failed", error: err });
      }

      const pdfBuffer = fs.readFileSync(outputFile);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${req.file.originalname.replace(
          /\.[^/.]+$/,
          ""
        )}.pdf"`
      );
      res.send(pdfBuffer);

      // Cleanup temp files
      fs.unlinkSync(tempDocPath);
      fs.unlinkSync(outputFile);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

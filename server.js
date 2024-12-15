const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Configure the uploads directory
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Cleanup uploads directory on server start
function cleanUploads() {
  if (fs.existsSync(UPLOADS_DIR)) {
    const files = fs.readdirSync(UPLOADS_DIR);
    files.forEach((file) => {
      const filePath = path.join(UPLOADS_DIR, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
    console.log('Uploads directory cleaned.');
  } else {
    // Create the uploads directory if it doesn't exist
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log('Uploads directory created.');
  }
}
cleanUploads(); // Run cleanup when the server starts

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));

// File upload endpoint
app.post('/upload', upload.fields([{ name: 'report1' }, { name: 'report2' }]), (req, res) => {
  const report1Path = `/uploads/${req.files.report1[0].filename}`;
  const report2Path = `/uploads/${req.files.report2[0].filename}`;
  res.json({ report1: report1Path, report2: report2Path });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

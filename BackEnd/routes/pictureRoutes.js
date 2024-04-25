const express = require('express');
const picController = require('../controller/picController');
const router = express.Router();
const multer = require('multer'); // Import multer
const path = require('path');
const {verifyTokenWithCookie} = require('../middle_ware/authMiddleware');

// Define storage options for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images')); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) { // Extract file extension
        const fileName = Date.now() + "_bucket_" + file.originalname; // Generate unique filename with extension
        req.filePath = "picture/"+fileName; // Assign the filename to req.filePath
        cb(null, fileName); // Pass the generated filename to the callback
    }
});

// Initialize multer middleware with storage options
const upload = multer({ storage: storage });

// Define your routes
// For example, to handle profile picture uploads
router.post('/uploadProfilePic', verifyTokenWithCookie, upload.single('Pic'), picController.uploadProfilePic);
router.post('/uploadPic', verifyTokenWithCookie, upload.single('Pic'), picController.uploadPic);
router.get('/:profilePicId', picController.getPic);

module.exports = router;

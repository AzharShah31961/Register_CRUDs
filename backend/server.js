const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserAccount = require('./models/UserAccount');  // Import UserAccount model

dotenv.config();  // Load environment variables

// Initialize Express app
const app = express();
const port = 5000;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to handle form submission
app.post('/upload', upload.single('UserImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Log to check what file we are getting
        console.log('Received file:', req.file);

        // Upload image to Cloudinary
        cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                console.log('Cloudinary upload error:', error);  // Log error to debug
                return res.status(500).json({ success: false, message: 'Error uploading image to Cloudinary', error: error });
            }

            // Log result to check Cloudinary response
            console.log('Cloudinary response:', result);

            // Save the user data in MongoDB
            const newUser = new UserAccount({
                userName: req.body.UserName,
                userEmail: req.body.UserEmail,
                userPassword: req.body.UserPassword,
                userImage: result.secure_url,  // Save the image URL from Cloudinary
                userStatus: req.body.selectedOption
            });

            newUser.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'User registered successfully',
                        imageUrl: result.secure_url
                    });
                })
                .catch((err) => {
                    console.log('MongoDB save error:', err);  // Log error to debug
                    res.status(500).json({ success: false, message: 'Error saving user to MongoDB', error: err });
                });
        }).end(req.file.buffer);

    } catch (error) {
        console.error('Error in upload route:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

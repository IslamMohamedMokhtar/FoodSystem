const path = require('path');
const fs = require('fs');
const Menu = require('../model/menu');
const uploadProfilePic = async (req, res) => {
    const userId = req.userID;
    const userProfilePicUrl = req.filePath;

    try {
        // Find the profile by ID and update it
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            // Handle case where profile is not found
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update the userProfilePicUrl field
        profile.userProfilePicUrl = userProfilePicUrl;

        // Save the updated profile
        const updatedProfile = await profile.save();

        // Send response with the updated profile
        res.json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const uploadPic = async (req, res) => {
    const userPicUrl = req.filePath;
    console.log(userPicUrl);
    try {
        res.json({ message: 'Profile updated successfully', picUrl: userPicUrl });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPic = async (req, res) => {
    const fileName = req.params.profilePicId;
    const filePath = path.join(__dirname, '../images', fileName);
    console.log(filePath);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Serve the file
    res.sendFile(filePath);
}
module.exports = {
    uploadProfilePic,
    getPic,
    uploadPic
}
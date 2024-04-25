const path = require('path');
const fs = require('fs');
const Profile = require('../model/profile');
const {profileErrors} = require('../constants');
const { responseBuilder } = require('../service/responseBuilder');
const { handleErrors } = require('../service/handleErrors');
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

const getProfilePic = async (req, res) => {
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

const getProfileByUser = async (req, res) => {
    const userId = req.userID;
    try {
        const response = await Profile.findOne({userId});
        if (response) {
            return res.json(responseBuilder({ result: { profile: response } }));
          } else {
            return res.status(400).json(responseBuilder({ error: 'profile not found' }));
          }
    } catch (error) {
        return res.status(500).send(responseBuilder({ error: handleErrors(error, profileErrors) }));
    }
}
const updateProfileByUser = async (req, res) => {
    const userId = req.userID;
    const {userName, userProfilePicUrl} = req.body;
    try {
         const response =await Profile.findOneAndUpdate({userId},{ userName, userProfilePicUrl }, { new: true });
        if (response) {
            
            return res.json(responseBuilder({ result: { profile: response } }));
          } else {
            return res.status(400).json(responseBuilder({ error: 'profile not found' }));
          }
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder({ error: handleErrors(error, profileErrors) }));
    }
}
module.exports = {
    uploadProfilePic,
    getProfilePic,
    getProfileByUser,
    updateProfileByUser
}

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../model/auth');
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('base64'); // 32 bytes (256 bits)
};

const verifyToken = (userId) => {
    const isExist = User.exists({_id: userId});
    return isExist;
};


function createToken(userId, maxAge) {
    return jwt.sign({ userId }, secretKey, { expiresIn: maxAge }); // Token expires in 1 hour
}
const secretKey = generateSecretKey();
module.exports =
{ 
    secretKey,
    verifyToken,
    createToken
};
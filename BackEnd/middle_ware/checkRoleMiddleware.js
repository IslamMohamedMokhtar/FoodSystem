const Auth = require('../model/auth');
const checkRole = (requiredRole) => async (req, res, next) => {
    try {
        const userID = req.userID;
        const user = await Auth.findById(userID);
        if (!user || !isRoleEqual(user.userRole, requiredRole) ) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        // If the user is authorized, proceed to the next middleware
        next();
    } catch (error) {
        // Handle errors here
        console.log("Error finding user:", error);
        return res.status(403).json({ error: 'Unauthorized Access' });
    }
};
const isRoleEqual = (userRole, requiredRole) => {
    if (Array.isArray(userRole)) {
        return userRole.every(role => requiredRole.includes(role));
    } else {
        return requiredRole.includes(userRole);
    }
};

module.exports =
{
    checkRole
}
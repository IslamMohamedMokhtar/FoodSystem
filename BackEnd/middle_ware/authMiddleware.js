const jwt = require('jsonwebtoken');
const { secretKey, verifyToken } = require('../service/tokenService');
const { responseBuilder } = require('../service/responseBuilder');


function verifyTokenWithHeader(req, res, next) {
  // Get the token from the request header, query parameter, or request body
  const token = req.headers['authorization'];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ token: 'Unauthorized: Token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // Attach the decoded payload to the request object for further use
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    // If token verification fails, return an error response
    return res.status(401).json({ token: 'Forbidden: Invalid token' });
  }
}

function verifyTokenWithCookie(req, res, next) {
  // Get the token from the request header, query parameter, or request body
  const token = req.cookies.jwt;

  // Check if token exists
  if (!token) {
    // return res.redirect('/login');
    return res.status(401).json(responseBuilder({result:{redirect:'/log-in'}}));
  }

  try {
    // Verify the token
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ token: 'Invalid token' });
      } else {
        const { userId, iat, exp } = decodedToken;
        req.userID = userId;

        if (exp) {
          // Get the current time in seconds
          const currentTime = Math.floor(Date.now() / 1000);

          // Compare the current time with the token's expiration time
          if (exp < currentTime) {
            return res.status(401).json({ token:'Token has expired'});
          }
        } else {
          return res.status(401).json({ token:'Token does not have an expiration time'});
        }

        verifyToken(userId)
          .then(isExist => {
            if (!isExist) {
              return res.status(401).json({ token:'Unauthorized Access'});
            } else {
              next();
            }
          })
          .catch(err => {
            throw err;
          });
      }
    });
  } catch (err) {
    // If token verification fails, return an error response
    return res.status(401).json({ token: 'Forbidden: Invalid token' });
  }
}


module.exports =
{
  verifyTokenWithHeader,
  verifyTokenWithCookie,
}
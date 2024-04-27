const { authErrors } = require('../constants');
const { handleErrors } = require('../service/handleErrors');
const { responseBuilder, responsePaginationBuilder } = require('../service/responseBuilder');
const Auth = require('../model/auth');
const Profile = require('../model/profile');
const userDetails = (req, res) => {
  const id = req.params.id.toString();
  Auth.findById(id)
    .then(response => {
      if (response) {
        return res.json(responseBuilder({ result: { User: response } }));
      } else {
        return res.status(404).json(responseBuilder({ error: 'user not found' }));
      }
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, authErrors) }));
    });
};
const getCurentUser = (req, res) => {
  const userId = req.userID.toString();
  console.log("userId",userId);
  Auth.findById(userId)
    .then(user => {
      if (user) {
        return res.send(responseBuilder({ result: { user: user } }));
      } else {
        return res.status(404).json(responseBuilder({ error: 'user not found' }));
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send(responseBuilder({ error: handleErrors(error, authErrors) }));
    });
};
const userIndexByFilter = async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query;
    const countQuery = await Auth.countDocuments();
    const users = await Auth.aggregate([
      // Perform a left outer join with the Profile collection
      {
        $lookup: {
          from: 'profiles', // Name of the Profile collection
          localField: '_id',
          foreignField: 'userId',
          as: 'profile'
        }
      },
      // Conditionally add the profile field based on whether it's empty or not
      {
        $addFields: {
          profile: {
            $cond: {
              if: { $eq: [{ $size: '$profile' }, 0] }, // Check if profile array is empty
              then: [{}], // Add an empty object if it's empty
              else: '$profile' // Otherwise, use the existing profile array
            }
          }
        }
      },
      // Unwind the profile array
      {
        $unwind: {
          path: '$profile',
          preserveNullAndEmptyArrays: true // Preserve users without profiles
        }
      },
      // Sort users by profile createdAt in descending order
      { $sort: { 'profile.createdAt': -1 } },
      // Skip and limit for pagination
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: parseInt(pageSize) },
    ]);
      console.log(users);

    return res.json(responsePaginationBuilder({ result: { User: users }, totalSize: countQuery }));
  } catch (error) {
    console.error(error);
    return res.status(500).send(responseBuilder({ error: handleErrors(error, authErrors) }));
  }
};




module.exports = {
  userDetails,
  userIndexByFilter,
  getCurentUser
};
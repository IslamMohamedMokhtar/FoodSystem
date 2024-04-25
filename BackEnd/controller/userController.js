const { authErrors } = require('../constants');
const { handleErrors } = require('../service/handleErrors');
const { responseBuilder, responsePaginationBuilder } = require('../service/responseBuilder');
const Auth = require('../model/auth');

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
  const userId = req.userID;
  Auth.findById(userId)
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
const userIndexByFilter = async(req, res) => {
  const type = req.query.type;
  const { pageNumber = 1, pageSize = 10 } = req.query;
  let query = {};
  if (type) {
      query = { type: type };
  }
  const countQuery = await Auth.countDocuments();
  Menu.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize) // Skip documents based on the page number
    .limit(pageSize)
  .then(response => {
      return res.json(responsePaginationBuilder({ result: { User: response }, totalSize: countQuery}));
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, authErrors) }));
    });
};



module.exports = {
  userDetails,
  userIndexByFilter,
  getCurentUser
};
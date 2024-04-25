const { menuErrors } = require('../constants');
const { handleErrors } = require('../service/handleErrors');
const { responseBuilder, responsePaginationBuilder } = require('../service/responseBuilder');
const Menu = require('../model/menu');
const menuPost = async (req, res) => {
    const createdBy = req.userID;
    const { picUrl, name, price, description, type } = req.body;
    try {
        const menu = await Menu.create({ picUrl, name, price, description, createdBy, type });
        return res.status(200).json(responseBuilder({ result: { Menu: menu } }));
    } catch (error) {
        return res.json(responseBuilder({ error: handleErrors(error, menuErrors) }));
    }
};

const menuDetails = (req, res) => {
  const id = req.params.id.toString();
  Menu.findById(id)
    .then(response => {
      if (response) {
        return res.json(responseBuilder({ result: { Menu: response } }));
      } else {
        return res.status(400).json(responseBuilder({ error: 'Menu not found' }));
      }
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, menuErrors) }));
    });
};

const menuUpdate = async (req, res) => {
  const id = req.params.id.toString();
  const { picUrl, name, price, description, type } = req.body;
  const createdBy = req.userID;
  try {
    const response = await Menu.findByIdAndUpdate(id, { picUrl, name, price, description, createdBy, type }, { new: true });
    if (response) {
        return res.json(responseBuilder({ result: { Menu: response } }));
      } else {
        return res.status(400).json(responseBuilder({ error: 'menu not found' }));
      }  
    } catch (error) {
    return res.status(500).send(responseBuilder({ error: handleErrors(error, menuErrors) }));
  }
};

const menuDelete = async (req, res) => {
  const id = req.params.id.toString();

  try {
    const menu =await Menu.findByIdAndDelete(id);
    return res.json(responseBuilder({ result: { Menu: menu } }));
  } catch (error) {
    if (error?.status)
      return res.status(error.status).json(responseBuilder({ error: [{ errorMessage: error.error }] }));
    return res.status(500).json(responseBuilder({ error: handleErrors(error, menuErrors) }));
  }
};



const menuIndex = (req, res) => {
  Menu.find().sort({ createdAt: -1 })
    .then(response => {
      return res.json(responseBuilder({ result: { product: response } }));
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, menuErrors) }));
    });
};
const menuIndexByFilter = async(req, res) => {
  const type = req.query.type;
  const { pageNumber = 1, pageSize = 10 } = req.query;
  let query = {};
  if (type) {
      query = { type: type };
  }
  const countQuery = await Menu.countDocuments(query);
  Menu.find(query)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize) // Skip documents based on the page number
    .limit(pageSize)
  .then(response => {
      return res.json(responsePaginationBuilder({ result: { product: response }, totalSize: countQuery}));
    })
    .catch(error => {
      return res.status(500).send(responseBuilder({ error: handleErrors(error, menuErrors) }));
    });
};



module.exports = {
  menuPost,
  menuDetails,
  menuIndex,
  menuUpdate,
  menuDelete,
  menuIndexByFilter
};
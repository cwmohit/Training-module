const db = require("../models");
const { User, Aadhar, Address } = db;

const getUsers = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, country_code, aadharNumber } = req.body;
    const aadharData = await Aadhar.create({
      aadharNumber: aadharNumber,
      name: fullname,
    });
    const data = await User.create({
      fullname,
      country_code,
      aadharId: aadharData.id,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, country_code, aadharNumber } = req.body;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    await Aadhar.update(
      {
        aadharNumber: aadharNumber,
        name: fullname,
      },
      {
        where: {
          id: user.aadharId,
        },
      }
    );
    await User.update(
      {
        fullname,
        country_code,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send("User has been updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    await Aadhar.destroy({
      where: {
        id: user.aadharId,
      },
    });
    await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send("User has been deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAadhars = async (req, res) => {
  try {
    const data = await Aadhar.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAadharByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const data = await Aadhar.findOne({
      where: {
        id: user.aadharId,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createAadhar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, aadharNumber } = req.body;
    const data = await Aadhar.create({
      name,
      aadharNumber,
    });
    await User.update(
      {
        aadharId: data.id,
        fullname: name,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createAddressesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const { street, city, country } = req.body;
    const user = await User.findOne({
      where: {
        id,
      },
    });

    const data = await Address.create({
      name: user.fullname,
      street,
      city,
      country,
      userId: id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAddressesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Address.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAddressByUserId = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const data = await Address.findOne({
      where: {
        userId: id,
        id: addressId,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateAddressByUserId = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const { street, city, country } = req.body;
    await Address.update(
      {
        street,
        city,
        country,
      },
      {
        where: {
          userId: id,
          id: addressId,
        },
      }
    );
    res.status(200).send("Address has been updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAadhars,
  createAadhar,
  getAadharByUserId,
  getAddressesByUserId,
  createAddressesByUserId,
  getAddressByUserId,
  updateAddressByUserId
};

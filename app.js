const express = require("express");

const { sequelize } = require("./models");
const {
  getUsers,
  createUser,
  getAadhars,
  getUserById,
  updateUser,
  deleteUser,
  createAadhar,
  getAadharByUserId,
  getAddressesByUserId,
  createAddressesByUserId,
  getAddressByUserId,
  updateAddressByUserId,
} = require("./controllers");

const app = express();
app.use(express.json());

app.get("/users", getUsers);
app.post("/users", createUser);
app.get("/users/:id", getUserById);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.get("/aadhars", getAadhars);
app.get("/users/:id/aadhar", getAadharByUserId);
app.post("/users/:id/aadhar", createAadhar);

app.get("/users/:id/addresses", getAddressesByUserId);
app.post("/users/:id/addresses", createAddressesByUserId);

app.get("/users/:id/addresses/:addressId", getAddressByUserId);
app.patch("/users/:id/addresses/:addressId", updateAddressByUserId);

app.listen({ port: 5050 }, async () => {
  console.log("Server up on http://localhost:5050");
  await sequelize.sync({ force: false });
  console.log("Database Connected!");
});

const express = require("express");

// Express ko app me me save kardia
const app = express();

// env
require("dotenv").config();

// middlewares  // decode karne keliye JSON  me

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// is line se database connect horaha ha
const { connectionDB } = require("./Config/Database");

// Controllers se method ko import karaya ha

const {
  createRoles,
  getRoles,
  deleteRole,
  updateRole
} = require("./Controllers/RolesController");

// Route define karna ke url per kiya chale to kiya aaya
app.route("/").get(getRoles).post(createRoles);
app.route("/role/:id").delete(deleteRole).put(updateRole);

// Port define
app.listen(process.env.PORT, function () {
  console.log(`Serves is running as ${process.env.PORT}`);
  connectionDB();
});

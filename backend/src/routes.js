const { Router } = require("express");
const axios = require("axios");
const Dev = require("./models/Dev");

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");
const routes = Router();

// listar a base de dados
routes.get("/devs", DevController.index);

// cadastrar dev
routes.post("/devs", DevController.store);
//buscar dev
routes.get("/search", SearchController.index);

module.exports = routes;

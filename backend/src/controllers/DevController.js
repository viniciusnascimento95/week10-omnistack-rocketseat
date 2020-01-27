const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/ParseStringAsArray");

const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      //Filtrar as conexões que estão ha no maximo 10 km de distancia
      //e o  que o novo deve tenha pelo menos uma das tecnolgoias filtradas

      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude
        },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  }
};

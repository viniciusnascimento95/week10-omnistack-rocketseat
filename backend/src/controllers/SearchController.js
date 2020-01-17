const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/ParseStringAsArray");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs, maxDist = 5000 } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDist
        }
      }
    });

    console.log(techsArray);
    //busca todos os devs num raio 10 km

    return response.json({ devs });

    //filtros
  }
};

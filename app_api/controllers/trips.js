const mongoose = require("mongoose");
const Trip = require("../models/travlr"); // Register model
const Model = mongoose.model("trips");

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTTP status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  try {
    const q = await Model.find({}) // No filter, return all records
      .exec();

    if (!q) {
      // Database returned no data
      return res.status(404).json({ message: "No trips found" });
    }
    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
  try {
    const q = await Model.find({ code: req.params.tripCode }) // Return single record
      .exec();

    if (!q || q.length === 0) {
      // No trip with that code
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
};

const Producer = require("../models/Producer");

exports.getProducers = async (req, res) => {
  const producers = await Producer.find();
  res.json(producers);
};

exports.createProducer = async (req, res) => {
  const producer = new Producer(req.body);
  await producer.save();
  res.json(producer);
};

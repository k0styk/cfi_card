const mongoose = require('mongoose');
const Summary = mongoose.model('Summary');

exports.createSummary = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw 'Summary name can contain only alphabets.';

  const summaryExists = await Summary.findOne({ name });

  if (summaryExists) throw 'Summary with that name already exists!';

  const summary = new Summary({
    name,
  });

  await summary.save();

  res.json({
    message: 'Summary created!',
  });
};

exports.getAllSummary = async (req, res) => {
  const summary = await Summary.find({});

  res.json(summary);
};
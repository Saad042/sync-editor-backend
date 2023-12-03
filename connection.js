const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

exports.createConnection = async function (mongoDbUri) {
  try {
    await mongoose.connect(mongoDbUri);
  } catch (error) {
    console.log('Connection to mongodb failed', error);
  }
};

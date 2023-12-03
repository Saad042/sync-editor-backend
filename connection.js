const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

exports.createConnection = async function (mongoDbUri) {
  try {
    await mongoose.connect(mongoDbUri);
    console.log('Connection to mongodb created succesfully');
  } catch (error) {
    console.log('Connection to mongodb failed', error);
  }
};

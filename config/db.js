const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1);
  }
};

module.exports = connectDB;

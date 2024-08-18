const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please enter your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  age: { 
    type: Number, 
    required: [true, 'Please enter your age'],
    min: [18, 'Age must be at least 18'],
    max: [120, 'Age cannot exceed 120']
  },
  location: { 
    type: String, 
    required: [true, 'Please enter your location'],
    trim: true,
    minlength: [2, 'Location must be at least 2 characters long'],
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  profession: { 
    type: String, 
    required: [true, 'Please enter your profession'],
    trim: true,
    minlength: [2, 'Profession must be at least 2 characters long'],
    maxlength: [100, 'Profession cannot exceed 100 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
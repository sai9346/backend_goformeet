const User = require('../models/user'); // Ensure this path is correct
const ApiFeatures = require('../utils/apiFeatures');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users with filtering, sorting, and pagination
exports.getUsers = async (req, res) => {
  try {
    // Initialize ApiFeatures instance
    const apiFeature = new ApiFeatures(User.find(), req.query)
      .search()
      .filter()
      .sort()
      .paginate();

    // Execute query
    const users = await apiFeature.query;
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
      totalPages: Math.ceil(totalUsers / apiFeature.limit),
      currentPage: apiFeature.page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run validation checks
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add dummy users to the database
exports.addDummyUsers = async (req, res) => {
  try {
    const dummyUsers = [
      { name: 'Aarav Gupta', age: 28, location: 'Delhi', profession: 'Software Engineer' },
      { name: 'Riya Sharma', age: 25, location: 'Mumbai', profession: 'Marketing Specialist' },
      { name: 'Vihaan Singh', age: 30, location: 'Bangalore', profession: 'Data Scientist' },
      { name: 'Aanya Patel', age: 27, location: 'Hyderabad', profession: 'UX Designer' },
      { name: 'Aditya Kumar', age: 32, location: 'Chennai', profession: 'Product Manager' },
      { name: 'Isha Verma', age: 24, location: 'Kolkata', profession: 'Graphic Designer' },
      { name: 'Kabir Reddy', age: 29, location: 'Pune', profession: 'Business Analyst' },
      { name: 'Diya Joshi', age: 26, location: 'Ahmedabad', profession: 'Content Writer' },
      { name: 'Arjun Desai', age: 31, location: 'Jaipur', profession: 'Full Stack Developer' },
      { name: 'Nidhi Chauhan', age: 28, location: 'Lucknow', profession: 'DevOps Engineer' }
    ];

    const users = await User.insertMany(dummyUsers);

    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

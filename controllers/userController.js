const User = require('../models/User');
const ApiFeatures = require('../utils/apiFeatures');

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const apiFeature = new ApiFeatures(User.find(), req.query)
      .search()
      .filter()
      .sort()
      .paginate();

    const users = await apiFeature.query;
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
      totalUsers,
      currentPage: apiFeature.page,
      totalPages: Math.ceil(totalUsers / apiFeature.limit)
    });
  } catch (error) {
    next(error);
  }
};

// Create new user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    await user.remove();
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Add dummy users
exports.addDummyUsers = async (req, res, next) => {
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

    await User.insertMany(dummyUsers);
    res.status(201).json({
      success: true,
      message: 'Dummy users added successfully'
    });
  } catch (error) {
    next(error);
  }
};
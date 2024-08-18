const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define your routes
router.post('/users', userController.createUser);         // Create a new user
router.get('/users', userController.getUsers);            // Get all users
router.put('/users/:id', userController.updateUser);      // Update an existing user
router.delete('/users/:id', userController.deleteUser);   // Delete a user
router.post('/dummy-users', userController.addDummyUsers); // Add dummy users

module.exports = router;

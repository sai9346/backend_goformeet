const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  createUser, 
  getUserDetails, 
  updateUser, 
  deleteUser, 
  addDummyUsers 
} = require('../controllers/userController');

router.route('/users').get(getUsers).post(createUser);
router.route('/users/:id').get(getUserDetails).put(updateUser).delete(deleteUser);
router.route('/dummy-users').post(addDummyUsers);

module.exports = router;
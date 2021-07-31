const { CreateUser, FindAllUser, DeleteUserById, UpdateUser}  = require("../controllers/UsersController");
var express = require('express');
var router = express.Router();

/* users listing. */
router.get('/users', FindAllUser);
router.post('/users', CreateUser);
router.delete('/users/:id', DeleteUserById);
router.put('/users', UpdateUser);

module.exports = router;

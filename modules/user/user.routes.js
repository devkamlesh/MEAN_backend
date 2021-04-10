const userController = require('./user.controller');
const multerUpload = require('../../middleware/multer.config');
const routes = require('express').Router();

routes.post('/user', userController.addUser);
routes.post('/upload_image', multerUpload.single('images'), userController.imageUpload);
routes.post('/delete_old_image', userController.deleteOldImages);
routes.get('/user', userController.getUsers);
routes.get('/user/:_id', userController.getUserById);
routes.post('/update_user/:_id', userController.updateUser);
routes.delete('/delete_user/:_id', userController.deleteUser);

module.exports = routes;
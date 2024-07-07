const express = require("express");
const {getUser, getUserById, createUser,updateAvatar,deleteUser,updateUser, uploadAvatar,Me,login,logout} = require ("../controller/usercontroller.js");
const {auth, adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/user',createUser);
router.get('/user' ,auth, getUser);
router.get('/user/:id',auth, getUserById);
router.patch('/user/avatar/:id',auth, uploadAvatar, updateAvatar);
router.patch('/user/:id',auth, adminOnly,updateUser);
router.delete('/user/:id',auth, adminOnly, deleteUser);
router.get('/me',auth, Me);
router.post('/login', login);
router.post('/logout', logout);
// export default router;
module.exports = router;



const express = require("express");
const {getUserAnswer, getUserAnswerById, createUserAnswer,deleteUserAnswer,updateUserAnswer, uploadFile,updateNilaiUserAnswer,getonlyUserAnswer,getUserAnswerBySoalId, checkUserAnswer} = require ("../controller/useranswercontroller.js");
const {auth, adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/answer/:id',auth, createUserAnswer);
router.patch('/answer/nilai/:id',auth, adminOnly, updateNilaiUserAnswer);
router.get('/answer' , auth, adminOnly,getUserAnswer);
router.get('/answer/me',auth, getonlyUserAnswer);
router.get('/answer/soal/:id',auth, adminOnly, getUserAnswerBySoalId);
router.get('/answer/detail/:id',auth, getUserAnswerById);
router.get('/answer/check/:id',auth, checkUserAnswer);
router.patch('/answer/:id',auth, adminOnly,updateUserAnswer);
router.delete('/answer/:id',auth, adminOnly, deleteUserAnswer);
// export default router;
module.exports = router;



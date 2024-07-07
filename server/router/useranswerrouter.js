const express = require("express");
const {getUserAnswer, getUserAnswerById, createUserAnswer,deleteUserAnswer,updateUserAnswer, uploadFile,updateNilaiUserAnswer,getonlyUserAnswer,getUserAnswerBySoalId} = require ("../controller/useranswercontroller.js");
const {auth, adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/useranswer/:id',auth, uploadFile, createUserAnswer);
router.post('/nilai/:id',auth, adminOnly,uploadFile, updateNilaiUserAnswer);
router.get('/useranswer' , getUserAnswer);
router.get('/useranswer/:id', getUserAnswerById);
router.get('/useranswer/soal/:id', getUserAnswerBySoalId);
router.get('/useranswer/my/:id', getonlyUserAnswer);
router.patch('/useranswer/:id',auth, uploadFile,updateUserAnswer);
router.delete('/useranswer/:id',auth, deleteUserAnswer);
// export default router;
module.exports = router;



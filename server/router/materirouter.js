const express = require("express");
const {getMateri, getMateriById, createMateri,deleteMateri,updateMateri, uploadFile, getPDF} = require ("../controller/matericontroller.js");
const {auth,adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/materi',auth, adminOnly, createMateri);
router.get('/materi' , getMateri);
router.get('/materi/:id', getMateriById);
router.post('/pdf/', auth, getPDF);
router.patch('/materi/:id',auth, adminOnly,updateMateri);
router.delete('/materi/:id',auth, adminOnly,deleteMateri);
// export default router;
module.exports = router;



const express = require("express");
const {getMateri, getMateriById, createMateri,deleteMateri,updateMateri, uploadFile} = require ("../controller/matericontroller.js");
const {auth,adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/materi',auth, adminOnly,uploadFile, createMateri);
router.get('/materi' , getMateri);
router.get('/materi/:id', getMateriById);
router.patch('/materi/:id',auth, adminOnly,uploadFile,updateMateri);
router.delete('/materi/:id',auth, adminOnly,deleteMateri);
// export default router;
module.exports = router;



const express = require("express");
const {getVidMateri, getVidMateriById, createVidMateri,deleteVidMateri,updateVidMateri} = require ("../controller/vidmatericontroller.js");
const {auth, adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/vidmateri',auth, adminOnly,createVidMateri);
router.get('/vidmateri' , getVidMateri);
router.get('/vidmateri/:id', getVidMateriById);
router.patch('/vidmateri/:id',auth, adminOnly,updateVidMateri);
router.delete('/vidmateri/:id',auth, adminOnly,deleteVidMateri);
// export default router;
module.exports = router;



const express = require("express");
const {getSoal, getSoalById, createSoal,deleteSoal,updateSoal, uploadFile} = require ("../controller/soalcontroller.js");
const {auth, adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/soal',auth, adminOnly,uploadFile, createSoal);
router.get('/soal' , getSoal);
router.get('/soal/:id', getSoalById);
router.patch('/soal/:id',auth, adminOnly,uploadFile,updateSoal);
router.delete('/soal/:id',auth, adminOnly,deleteSoal);
// export default router;
module.exports = router;



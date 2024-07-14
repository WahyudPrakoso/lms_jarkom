const express = require("express");
const {getSoal, getSoalById, createSoal,deleteSoal,updateSoal, uploadFile} = require ("../controller/soalcontroller.js");
const {auth, adminOnly} = require("../middleware/auth.js");


const router = express.Router(); 

router.post('/soal',auth, adminOnly, createSoal);
router.get('/soal' ,auth, getSoal);
router.get('/soal/:id',auth, getSoalById);
router.patch('/soal/:id',auth, adminOnly,updateSoal);
router.delete('/soal/:id',auth, adminOnly,deleteSoal);
// export default router;
module.exports = router;



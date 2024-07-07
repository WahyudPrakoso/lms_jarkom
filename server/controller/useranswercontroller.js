const UserAnswer = require("../model/useranswermodel.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs');
const User = require("../model/usermodel.js");
const Soal = require("../model/soalmodel.js");

// const date = Date.format(Date('YYYYMMDDHHmmss'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/files/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-userAnswer-" + uuidv4() + path.extname(file.originalname))
    }
});

const uploadFile = multer({
    storage: storage,
    limits: {
        fieldSize: '2000000' // 2mb
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        
        if (mimeType && extname) return cb(null, true);
        
        cb('Tipe file anda tidak diizinkan');
    }
    // }).array('file', 2); //bisa 2 file
}).single('file'); // satu file
// }).fields([{
//     name : 'surat_pernyataan',
//     maxCount : 1
// },{
//     name : 'portofolio',
//     maxCount : 1
// }])

const createUserAnswer = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    console.log(req.params.id);
    const soal = await Soal.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!soal) return res.status(404).json({ msg: "Soal tidak ditemukan" });
    if (!req.file) return res.status(500).json({ msg: "upload gagal" });
    try {
        await UserAnswer.create({
            uuid: uuidv4(),
            userId: user.id,
            soalId: soal.id,
            file: 'storage/files/'+req.file.filename
        });
        return res.status(201).json({ msg: "jawaban berhasil disimpan!" });
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        return res.status(400).json({ msg: "errornya adalah "+error });
    }
}

const updateUserAnswer = async (req, res) => {
    try {
        if (!req.file) return res.status(404).json({ msg: "data kosong" });
        const userAnswer = await UserAnswer.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!userAnswer) return res.status(404).json({ msg: "jawaban tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.id === userAnswer.userId){
            await UserAnswer.update({
                file: 'storage/files/'+req.file.filename
            }, {
                where: {
                    id: userAnswer.id
                }
            });
            
            fs.unlink(userAnswer.file, (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.status(201).json({ msg: "Update jawaban Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat jawaban!");
        }
        
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}
const deleteUserAnswer = async (req, res) => {
    try {
        const userAnswer = await UserAnswer.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!userAnswer) return res.status(404).json({ msg: "jawaban tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.id === userAnswer.userId){
            await UserAnswer.destroy({
                where: {
                    id: userAnswer.id
                }
            });
            fs.unlink(userAnswer.file, (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.status(201).json({ msg: "Delete jawaban Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat UserAnswer!");
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const updateNilaiUserAnswer = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        // if (!user.role === "1711") return res.status(401).json({ msg: "unauthorized!" });
        const userAnswer = await UserAnswer.findOne({
            where: {
                uuid: req.params.id
            },
            include:[
                {
                    model : Soal,
                    attributes :['userId']
                }
            ]
        });
        if (!userAnswer) return res.status(404).json({ msg: "jawaban tidak ditemukan" });
        
        // if(user.id === userAnswer.soal.userId){
            const {nilai} = req.body
            await UserAnswer.update({
                nilai: nilai
            }, {
                where: {
                    id: userAnswer.id
                }
            });
            return res.status(201).json({ msg: "Update jawaban Berhasil" });
        // }else{
        //     return res.status(401).json("User bukan pembuat Soal!");
        // }
        
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

const getUserAnswer = async (req, res) => {
    try {
        let response = await UserAnswer.findAll({
            attributes: ['uuid','file', 'nilai', 'status'],
            order: [
                ['createdAt', 'DESC']
            ],
            include:[
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model : Soal,
                    attributes : ['name']
                }
            ]
        });
        // console.log(response.length);
        let splittedWord;
        if(response.length > 0 ){
            // response.map(function (res){
            //     res.file = !res.file ? "Data kosong" : res.file;
            //     splittedWord = res.file.split("/")
            //     res.file = splittedWord[2]
            // })
            return res.status(200).json(response)
        }else{ 
            return res.status(404).json("jawaban telah dihapus atau belum dibuat!");
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getonlyUserAnswer = async (req, res) => {
    try {
        let response = await UserAnswer.findAll({
            attributes: ['uuid','file', 'nilai', 'status'],
            order: [
                ['createdAt', 'DESC']
            ],
            include:[
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model : Soal,
                    attributes : ['name']
                }
            ],
            where:{
                userid : req.user.id
            }
        });
        // console.log(response.length);
        let splittedWord;
        if(response.length > 0 ){
            // response.map(function (res){
            //     res.file = !res.file ? "Data kosong" : res.file;
            //     splittedWord = res.file.split("/")
            //     res.file = splittedWord[2]
            // })
            return res.status(200).json(response)
        }else{ 
            return res.status(404).json("jawaban telah dihapus atau belum dibuat!");
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
const getUserAnswerBySoalId = async (req, res) => {
    try {
        const soal = await Soal.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!soal) return res.status(404).json({ msg: "soal tidak ditemukan!" });
        let response = await UserAnswer.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where:{
                soalId : soal.id
            }
        });
        // console.log(response.length);
        let splittedWord;
        if(response.length > 0 ){
            // response.map(function (res){
            //     res.file = !res.file ? "Data kosong" : res.file;
            //     splittedWord = res.file.split("/")
            //     res.file = splittedWord[2]
            // })
            return res.status(200).json(response)
        }else{ 
            return res.status(404).json("jawaban telah dihapus atau belum dibuat!");
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}


const getUserAnswerById = async (req, res) => {
    try {
        const response = await UserAnswer.findOne({
            attributes: ['uuid', 'file', 'nilai', 'status'],
            where: {
                uuid: req.params.id
            },
            include:[
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model : Soal,
                    attributes : ['name']
                }
            ]
        });
        let splittedWord;
        if(!response){
            return res.status(404).json("jawaban telah dihapus atau belum dibuat!");
        }else{ 
            // response.file = !response.file ? "Data kosong" : response.file;
            // splittedWord = response.file.split("/")
            // response.file = splittedWord[2]
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}



module.exports = {
    createUserAnswer,
    uploadFile,
    updateUserAnswer,
    deleteUserAnswer,
    getUserAnswer,
    getUserAnswerById,
    getonlyUserAnswer,
    getUserAnswerBySoalId,
    updateNilaiUserAnswer
}
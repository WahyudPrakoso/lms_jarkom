const Soal = require("../model/soalmodel.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs');
const User = require("../model/usermodel.js");
const moment = require("moment-timezone");
// const tz = require("moment-timezone");

// const date = Date.format(Date('YYYYMMDDHHmmss'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/files/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-soal-" + uuidv4() + path.extname(file.originalname))
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

const createSoal = async (req, res) => {
    const { name, about, deadline} = req.body;
    if (!req.file) return res.status(500).json({ msg: "upload gagal" });
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        const dl = moment(deadline)
        await Soal.create({
            uuid: uuidv4(),
            userId: user.id,
            name: name,
            about: about,
            deadline : dl,
            file: 'storage/files/'+req.file.filename
        });
        return res.status(201).json({ msg: "Soal berhasil dibuat!" });
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        return res.status(400).json({ msg: "errornya adalah ="+error });
    }
}

const updateSoal = async (req, res) => {
    
    try {
        const { name, about, deadline} = req.body;
        if (!req.file) return res.status(500).json({ msg: "upload gagal" });
        const soal = await Soal.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!soal) return res.status(404).json({ msg: "Soal tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.id === soal.userId){
            const dl = moment(deadline)
            await Soal.update({
                name: name,
                about: about,
                deadline : dl,
                file: 'storage/files/'+req.file.filename
            }, {
                where: {
                    id: soal.id
                }
            });
            
            fs.unlink(soal.file, (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.status(201).json({ msg: "Update Soal Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat Soal!");
        }
        
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
    
}
const deleteSoal = async (req, res) => {
    try {
        const soal = await Soal.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!soal) return res.status(404).json({ msg: "Soal tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.id === soal.userId){
            await Soal.destroy({
                where: {
                    id: soal.id
                }
            });
            fs.unlink(soal.file, (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.status(201).json({ msg: "Delete Soal Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat Soal!");
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getSoal = async (req, res) => {
    try {
        let response = await Soal.findAll({
            attributes: ['uuid', 'name', 'about','deadline', 'file'],
            order: [
                ['createdAt', 'DESC']
            ],
            include:[
                {
                    model : User,
                    attributes : ['name']
                }
            ]
        });
        return response.length > 0
        ? res.status(200).json(response) 
        :res.status(404).json("Soal telah dihapus atau belum dibuat!");
        
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getSoalById = async (req, res) => {
    try {
        const response = await Soal.findOne({
            attributes: ['uuid', 'name', 'about','deadline', 'file'],
            where: {
                uuid: req.params.id
            },
            include:[
                {
                    model : User,
                    attributes : ['name']
                }
            ]
        });
        return response 
        ? res.status(200).json(response) 
        : res.status(404).json("Soal telah dihapus atau belum dibuat!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    createSoal,
    uploadFile,
    updateSoal,
    deleteSoal,
    getSoal,
    getSoalById
}
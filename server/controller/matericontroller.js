const Materi = require("../model/materimodel.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs');
const User = require("../model/usermodel.js");

// const date = Date.format(Date('YYYYMMDDHHmmss'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/files/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-materi-" + uuidv4() + path.extname(file.originalname))
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

const createMateri = async (req, res) => {
    const { name, about} = req.body;
    if (!req.file) return res.status(500).json({ msg: "upload gagal" });
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        await Materi.create({
            uuid: uuidv4(),
            userId: user.id,
            name: name,
            about: about,
            file: 'storage/files/'+req.file.filename
        });
        return res.status(201).json({ msg: "Materi berhasil dibuat!" });
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        return res.status(400).json({ msg: "errornya adalah "+error });
    }
}

const updateMateri = async (req, res) => {
    
    try {
        const { name, about} = req.body;
        if (!req.file) return res.status(500).json({ msg: "upload gagal" });
        const materi = await Materi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!materi) return res.status(404).json({ msg: "Materi tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.id === materi.userId){
            await Materi.update({
                name: name,
                about: about,
                file: 'storage/files/'+req.file.filename
            }, {
                where: {
                    id: materi.id
                }
            });
            
            fs.unlink(materi.file, (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.status(201).json({ msg: "Update Materi Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat materi!");
        }
        
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}
const deleteMateri = async (req, res) => {
    try {
        const materi = await Materi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!materi) return res.status(404).json({ msg: "Materi tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.id === materi.userId){
            await Materi.destroy({
                where: {
                    id: materi.id
                }
            });
            fs.unlink(materi.file, (err) => {
                if (err) {
                    throw err;
                }
            });
            return res.status(201).json({ msg: "Delete Materi Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat materi!");
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getMateri = async (req, res) => {
    try {
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const offset = limit * page;
        let response = await Materi.findAll({
            attributes: ['uuid', 'name', 'about', 'file'],
            order: [
                ['createdAt', 'DESC']
            ],
            include:[
                {
                    model : User,
                    attributes : ['name']
                }
            ],
            offset: offset,
            limit: limit,
        });
        let count = await Materi.count();
        
        const totalPage = Math.ceil(count / limit);
        // console.log(response.length);
        return response.length > 0 
        ? res.status(200).json({pages: page+1, offset: offset, limit: limit, total : response.length, total_pages : totalPage, data : response}) 
        : res.status(404).json("Materi telah dihapus atau belum dibuat!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getMateriById = async (req, res) => {
    try {
        const response = await Materi.findOne({
            attributes: ['uuid', 'name', 'about', 'file'],
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
        : res.status(404).json("Materi telah dihapus atau belum dibuat!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}



module.exports = {
    createMateri,
    uploadFile,
    updateMateri,
    deleteMateri,
    getMateri,
    getMateriById
}
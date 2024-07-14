const Soal = require("../model/soalmodel.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs');
const User = require("../model/usermodel.js");
const moment = require("moment-timezone");
const { Op } = require("sequelize");
const useranswer = require("../model/useranswermodel.js");
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
    const { name, about, file, deadline} = req.body;
    console.log("----------=========================", file);
    // if (!req.file) return res.status(500).json({ msg: "upload gagal" });
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if(user.role === '1711') return res.status(401).json({ msg: "Unauthorized!" });
    try {
        const dl = moment(deadline)
        await Soal.create({
            uuid: uuidv4(),
            userId: user.id,
            name: name,
            about: about,
            deadline : new Date(dl),
            file: file
        });
        return res.status(201).json({ msg: "Soal berhasil dibuat!" });
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        return res.status(400).json({ msg: "errornya adalah ="+error });
    }
}

const updateSoal = async (req, res) => {
    
    try {
        const { name, about,file, deadline} = req.body;
        // if (!req.file) return res.status(500).json({ msg: "upload gagal" });
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
        if(user.role === '1711') return res.status(401).json({ msg: "Unauthorized!" });
        if(user.id === soal.userId){
            const dl = moment(deadline)
            await Soal.update({
                name: name,
                about: about,
                deadline : dl,
                file: file
            }, {
                where: {
                    id: soal.id
                }
            });
            
            // fs.unlink(soal.file, (err) => {
            //     if (err) {
            //         throw err;
            //     }
            // });
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
        if(user.role === '1711') return res.status(401).json({ msg: "Unauthorized!" });
        if(user.id === soal.userId){
            await Soal.destroy({
                where: {
                    id: soal.id
                }
            });
            // fs.unlink(soal.file, (err) => {
            //     if (err) {
            //         throw err;
            //     }
            // });
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
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const filter = req.query.filter || "";
        const offset = limit * page;
        let response = await Soal.findAll({
            attributes: ['id','uuid', 'name', 'about', 'deadline','file'],
            where: {
                name: {
                    [Op.like]: '%' + filter + '%'
                }
                
            },
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
        let count = await Soal.count({
            where: {
                name: {
                    [Op.like]: '%' + filter + '%'
                }
                
            }
        });
        let isAnswered
        const poll = []
        for(let i=0;i<response.length;i++){
            isAnswered = await useranswer.count({
                where : {
                    [Op.and] : [{
                        userId : req.user.id
                    },{
                        soalId : response[i].id
                    }]
                }
            })
            poll.push(isAnswered >0 ? 1 : 0 )
        }
        // return res.status(200).json(response)
        const totalPage = Math.ceil(count / limit);
        return response.length > 0 
        ? res.status(200).json({pages: page+1, offset: offset, limit: limit, total : response.length, total_pages : totalPage, userAnswered:poll, data : response}) 
        : res.status(404).json("Soal telah dihapus atau belum dibuat!");
        
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
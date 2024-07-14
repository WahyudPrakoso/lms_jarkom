const UserAnswer = require("../model/useranswermodel.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require('fs');
const User = require("../model/usermodel.js");
const Soal = require("../model/soalmodel.js");
const { Op } = require("sequelize");

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
    const {file } = req.body
    console.log("=============================================+"+file);
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
    // if (!req.file) return res.status(500).json({ msg: "upload gagal" });
    const now = new Date();
    const deadline = new Date(soal.deadline);
    let status = deadline > now ? 'tepat waktu' : 'terlambat';
    try {
        await UserAnswer.create({
            uuid: uuidv4(),
            userId: user.id,
            soalId: soal.id,
            status : status,
            nilai : 'belum',
            file: file
        });
        return res.status(201).json({ msg: "jawaban berhasil disimpan!" });
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        return res.status(400).json({ msg: "errornya adalah "+error });
    }
}

//murid hanya bisa create saja
const updateUserAnswer = async (req, res) => {
    try {
        // if (!req.file) return res.status(404).json({ msg: "data kosong" });
        const {file} = req.body
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
        if(user.role === '0105' || user.id === userAnswer.userId){
            await UserAnswer.update({
                file: file
            }, {
                where: {
                    id: userAnswer.id
                }
            });
            
            // fs.unlink(userAnswer.file, (err) => {
            //     if (err) {
            //         throw err;
            //     }
            // });
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
        if(user.role === '0105' || user.id === userAnswer.userId){
            await UserAnswer.destroy({
                where: {
                    id: userAnswer.id
                }
            });
            // fs.unlink(userAnswer.file, (err) => {
            //     if (err) {
            //         throw err;
            //     }
            // });
            return res.status(201).json({ msg: "Delete jawaban Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat UserAnswer!");
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const updateNilaiUserAnswer = async (req, res) => {
    const {file} = req.body
    try {
        if (req.user.role === "1711") return res.status(401).json({ msg: "unauthorized!" });
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
            await UserAnswer.update({
                nilai: file
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
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const filter = req.query.filter || "";
        const offset = limit * page;
        let response = await UserAnswer.findAll({
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
                    attributes : ['name'],
                    where: {
                        name: {
                            [Op.like]: '%' + filter + '%'
                        }
                        
                    },
                }
            ],
            offset: offset,
            limit: limit,
        });
        let count = await UserAnswer.count({
            include:[
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model : Soal,
                    attributes : ['name'],
                    where: {
                        name: {
                            [Op.like]: '%' + filter + '%'
                        }
                        
                    },
                }
            ],
        });
        
        const totalPage = Math.ceil(count / limit);
        // console.log(response.length);

        return res.status(200).json({pages: page+1, offset: offset, limit: limit, total : response.length, total_pages : totalPage, data : response}) 
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const checkUserAnswer = async (req, res) => {
    try {
        const soal = await Soal.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!soal) return res.status(404).json({ msg: "soal tidak ditemukan!" });
        let response = await UserAnswer.count({
            where: {
                [Op.and] :[{
                    soalId: soal.id
                },{
                    userId : req.user.id
                }]
                
            },
        });
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getonlyUserAnswer = async (req, res) => {
    try {
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const filter = req.query.filter || "";
        const offset = limit * page;
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        let response = await UserAnswer.findAll({
            where: {
                userId : user.id
            },
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
                    attributes : ['name'],
                    where: {
                        name: {
                            [Op.like]: '%' + filter + '%'
                        }
                        
                    },
                }
            ],
            offset: offset,
            limit: limit,
        });
        let count = await UserAnswer.count({
            where: {
                userId : user.id
            },
            include:[
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model : Soal,
                    attributes : ['name'],
                    where: {
                        name: {
                            [Op.like]: '%' + filter + '%'
                        }
                        
                    },
                }
            ],
        });
        const totalPage = Math.ceil(count / limit);
        // console.log(response.length);
        return res.status(200).json({pages: page+1, offset: offset, limit: limit, total : response.length, total_pages : totalPage, data : response}) 

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
const getUserAnswerBySoalId = async (req, res) => {
    try {
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const filter = req.query.filter || "";
        const offset = limit * page;
        const soal = await Soal.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!soal) return res.status(404).json({ msg: "soal tidak ditemukan!" });
        let response = await UserAnswer.findAll({
            where: {
                soalId : soal.id
            },
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
                    attributes : ['name'],
                    where: {
                        name: {
                            [Op.like]: '%' + filter + '%'
                        }
                        
                    },
                }
            ],
            offset: offset,
            limit: limit,
        });
        let count = await UserAnswer.count({
            where: {
                soalId : soal.id
            },
            include:[
                {
                    model : User,
                    attributes : ['name']
                },
                {
                    model : Soal,
                    attributes : ['name'],
                    where: {
                        name: {
                            [Op.like]: '%' + filter + '%'
                        }
                        
                    },
                }
            ],
        });
        
        const totalPage = Math.ceil(count / limit);
        // console.log(response.length);

        return res.status(200).json({soal: soal,pages: page+1, offset: offset, limit: limit, total : response.length, total_pages : totalPage, data : response}) 
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}


const getUserAnswerById = async (req, res) => {
    try {
        const response = await UserAnswer.findOne({
            where: {
                uuid: req.params.id
            },
            include:[
                {
                    model : User,
                    attributes : ['uuid','name']
                },
                {
                    model : Soal,
                    attributes : ['uuid','name']
                }
            ]
        });
        return res.status(200).json(response)
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
    updateNilaiUserAnswer,
    checkUserAnswer
}
const VidMateri = require("../model/vidmaterimodel.js");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/usermodel.js");
const { Op } = require("sequelize");

const createVidMateri = async (req, res) => {
    const { name, about, link} = req.body;
    // console.log("================================"+name,about,link);
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if(user.role === '1711') return res.status(401).json({ msg: "Unauthorized!" });
    try {
        await VidMateri.create({
            uuid: uuidv4(),
            userId: user.id,
            name: name,
            about: about,
            link: link
        });
        return res.status(201).json({ msg: "Materi video berhasil dibuat!" });
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        return res.status(400).json({ msg: "errornya adalah "+error });
    }
}

const updateVidMateri = async (req, res) => {
    try {
        const { name, about, link} = req.body;
        // console.log(req.params.id+"---------------------------------------"+name,about,link);
        const vidMateri = await VidMateri.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!vidMateri) return res.status(404).json({ msg: "Materi video tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.role === '1711') return res.status(401).json({ msg: "Unauthorized!" });
        if(user.id === vidMateri.userId){
            await VidMateri.update({
                name: name,
                about: about,
                link: link
            }, {
                where: {
                    id: vidMateri.id
                }
            });
            return res.status(201).json({ msg: "Update materi video Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat materi!");
        }
        
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}
const deleteVidMateri = async (req, res) => {
    try {
        const vidMateri = await VidMateri.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!vidMateri) return res.status(404).json({ msg: "Materi Video tidak ditemukan" });
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if(user.role === '1711') return res.status(401).json({ msg: "Unauthorized!" });
        if(user.id === vidMateri.userId){
            await VidMateri.destroy({
                where: {
                    id: vidMateri.id
                }
            });
            return res.status(201).json({ msg: "Delete materi video Berhasil" });
        }else{
            return res.status(401).json("User bukan pembuat materi!");
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getVidMateri = async (req, res) => {
    try {
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const filter = req.query.filter || "";
        const offset = limit * page;
        let response = await VidMateri.findAll({
            attributes: ['uuid', 'name', 'about', 'link'],
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
        let count = await VidMateri.count({
            where: {
                name: {
                    [Op.like]: '%' + filter + '%'
                }
                
            }
        });
        
        const totalPage = Math.ceil(count / limit);
        // console.log(response.length);
        return response.length > 0 
        ? res.status(200).json({pages: page+1, offset: offset, limit: limit, total : response.length, total_pages : totalPage, data : response}) 
        : res.status(404).json("Materi telah dihapus atau belum dibuat!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getVidMateriById = async (req, res) => {
    try {
        const response = await VidMateri.findOne({
            attributes: ['uuid', 'name', 'about', 'link'],
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
        : res.status(404).json("Materi video telah dihapus atau belum dibuat!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}



module.exports = {
    createVidMateri,
    updateVidMateri,
    deleteVidMateri,
    getVidMateri,
    getVidMateriById
}
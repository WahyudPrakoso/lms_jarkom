const VidMateri = require("../model/vidmaterimodel.js");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/usermodel.js");

const createVidMateri = async (req, res) => {
    const { name, about, link} = req.body;
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
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
        let response = await VidMateri.findAll({
            attributes: ['uuid', 'name', 'about', 'link'],
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
        // console.log(response.length);
        return response.length > 0 
        ? res.status(200).json(response) 
        : res.status(404).json("VidMateri telah dihapus atau belum dibuat!");
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
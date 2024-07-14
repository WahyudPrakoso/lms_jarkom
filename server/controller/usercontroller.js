const User = require("../model/usermodel.js");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
dotenv.config().parsed;

const login = async (req, res) => {
    // console.log(req.body);
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(404).json({ msg: "user tidak ditemukan!!" });
        const match = await argon2.verify(user.password, req.body.password);
        if (!match) return res.status(404).json({ msg: "user tidak ditemukan!!" });
        
        const id = user.id;
        const name = user.name;
        const avatar = user.avatar;
        const email = user.email;
        const role = user.role;
        const no_hp = user.no_hp;
        const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2d'
        });
        return res.cookie("accessToken", token, {
            httpOnly : true
        }).status(200).json({id, name, email, no_hp, avatar, role, accessToken : token});
        
    } catch (error) {
        
        console.log(error);
        // res.status(404).json({msg : "Data tidak ditemukan!"});
        return res.status(400).send();
    }
}

const Me = async (req, res) => {
    try{
        const id = req.userId;
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'no_hp', 'role', 'avatar'],
            where: {
                id: id
            }
        });
        
        if (!user) return res.status(404).json({ msg: "tidak ada user yang ditemukan" });
        
        user.avatar = process.env.APP_ADDRESS + '/storage/images/' + user.avatar
        
        return res.status(200).json(user);
    }catch(err){
        console.log(err)
        return res.status(400).send();
    }
    
    
}
const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            secure:true,
            sameSite : "none"
        }).status(200).json("user telah logout");
        // let token
        // const authorization = req.get('authorization')
        // if (authorization && authorization.startsWith('Bearer')) {
        //     token = authorization.substring(7)
        // }
        // const decoded = jwt.decode(token)
        // const user = await User.findOne({ where : {id : decoded.id} })
        
        // if (!user) res.status(400).send('token telah rusak')
        
        // //   const alreadyInvalidated = await User.findbyOne({ where : { invalidatedTokens: token} })
        // const alreadyInvalidated = ( user.invalidatedTokens === token) ? true : false;
        
        // if (!alreadyInvalidated) {
        //     await User.update({
        //         invalidatedTokens :token
        //     },{
        //         where : {
        //             id : user.id
        //         }
        //     })
        // } 
        
        // user.invalidatedTokens = user.invalidatedTokens.filter((token) => {
            //     const { exp } = jwt.decode(token)
        //     if (Date.now() >= exp * 1000) return false
        //     else return true
        // })
        
        
        res.send('You Logged out')
    } catch (e) {
        res.status(500).send({ error: e.message || e.toString() })
    }
}
// const logout = async (req, res) => {
    //     // const refreshToken = req.cookies.refreshToken;
//     const { id } = req.body
//     if (!id || id == "") return res.sendStatus(404).json({ msg: "data tidak ketemu" });
//     const user = await User.findOne({
//         where: {
//             id: id
//         }
//     });
//     if (!user) return res.sendStatus(404).json({ msg: "data tidak ditemukan" });
//     // if (!user.refresh_token || user.refresh_token == "") return res.sendStatus(404).json({ msg: "mohon login ke akun anda" });
//     // console.log("wes "+user.id);
//     // const id = user.id;
//     await User.update({ refreshToken: null }, {
//         where: {
//             id: id
//         }
//     });
//     // console.log(id);a
//     // res.clearCookie('refreshToken');
//     // console.log("asdasd");
//     // req.session.destroy((err)=>{
    //     //     if(err) return res.status(400).json({msg : "tidak dapat logout hiya hiya"});
//     //     res.status(200).json({msg : "anda telah logout"});
//     // })
//     res.status(200).json({ msg: "anda berhasil logout" });
// }

const createUser = async (req, res) => {
    
    try {
        const { name, email, password, confpassword, no_hp, code } = req.body;
        // console.log(req.body)
        const isEmailused = await User.count({
            where: {
                email: email
            }
        })
        if (isEmailused > 0) return res.status(409).json("Email sudah terdaftar!!")
            if (password !== confpassword) return res.status(400).json("Password dan Confirm Password tidak cocok");
        const hashPassword = await argon2.hash(password);
        let verifyEmail = Math.floor(100000 + Math.random() * 900000);
        /*NOTE BOUT ROLES
        Murid = 1711
        Guru = 0105
        
        */
        const role = ["1711","0105"];
        let kode = code
        if(!kode || !role.includes(kode)) kode = "1711";
        // if(!role.includes(kode)) return res.status(404).json("tidak ditemukan kode yang cocok")
 
        await User.create({
            uuid: uuidv4(),
            name: name,
            email: email,
            no_hp: no_hp,
            password: hashPassword,
            role: kode,
            is_verified: false,
            verify_email: verifyEmail
        });
        res.status(201).json("Akun user berhasil dibuat!" );
        // res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-avatar-" + uuidv4() + path.extname(file.originalname))
    }
});

const uploadAvatar = multer({
    storage: storage,
    limits: {
        fieldSize: '2000000' // 2mb
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        
        if (mimeType && extname) return cb(null, true);
        
        cb('Tipe file anda tidak diizinkan');
    }
    // }).array('file', 2); //bisa 2 file
}).single('avatar'); // satu file
// }).fields([{
//     name : 'surat_pernyataan',
//     maxCount : 1
// },{
//     name : 'portofolio',
//     maxCount : 1
// }])
const updateAvatar = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
        // const {avatar} = req.body;
        let avatar;
        if (req.file) {
            avatar = process.env.APP_ADDRESS + "/storage/images/" + req.file.filename
        } else {
            if (user.avatar === 'https://www.w3schools.com/howto/img_avatar.png') {
                avatar = 'https://www.w3schools.com/howto/img_avatar.png'
            } else {
                avatar = process.env.APP_ADDRESS + "/storage/images/" + user.avatar
            }
        }
        
        try {
            await User.update({
                avatar: avatar
            }, {
                where: {
                    id: user.id
                }
            });
            const newUser = await User.findOne({
                where: {
                    id: user.id
                }
            });
            res.status(201).json({ status: "berhasil", newAvatar: newUser.avatar });
        } catch (error) {
            res.status(400).json(error.message);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
        // return res.json(user)
        const { name, email, password, confpassword, no_hp } = req.body;
        let hashPassword;
        if (!password || !confpassword) {
            hashPassword = user.password;
        } else if (password === '' || password === null) {
            hashPassword = user.password;
        }
        else {
            if (password !== confpassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
            hashPassword = await argon2.hash(password);
        }
        
        try {
            
            await user.update({
                name: name,
                email: email,
                password: hashPassword,
                no_hp: no_hp
            }, {
                where: {
                    id: user.id
                }
            });
            res.status(201).json("Update User Berhasil");
        } catch (error) {
            res.status(400).json(error);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
        
        try {
            await user.destroy({
                where: {
                    id: user.id
                }
            });
            res.status(201).json( "Delete User Berhasil");
        } catch (error) {
            res.status(400).json( error.message);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getUser = async (req, res) => {
    try {
        let response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'no_hp', 'role'],
            order: [
                ['createdAt', 'DESC']
            ]
        });
       return res.status(200).json(response);
    } catch (error) {
       return res.status(500).json(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'no_hp', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}



module.exports = {
    login,
    Me,
    logout,
    createUser,
    uploadAvatar,
    updateAvatar,
    updateUser,
    deleteUser,
    getUser,
    getUserById
}
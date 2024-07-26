const User = require("../model/usermodel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config().parsed;

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(!token) return res.sendStatus(401).json({msg : "Token tidak diterima !"});
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if(err) return res.sendStatus(403).json({msg:"token expired!! mohon login kembali "});
//         req.userId = decoded.id;
//         req.role = decoded.role;
//         // req.userId = 11;
//         // req.role = "Member";
//         // req.role = "Mentor";
//     //    console.log(req.userId,req.role);
//         next();
//     });
// }

const auth = async (req, res, next) => {
    try {
        // const authorization = req.get('authorization')
        // if (authorization && authorization.startsWith('Bearer')) {
        //     token = authorization.substring(7)
        // }
        
        const token = req.cookies.accessToken;
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(decoded.id)
        const user = await User.findOne({ 
            where: {
                id: decoded.id
            } 
        })
        
        if (!user) {
            throw new Error('Mohon register dahulu')
        }

        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

const verifyEmailUser = async(req,res,next) => {
    
    const user = await User.findOne({
        where:{
            id : req.userId
        }
    });
    
    // console.log("1");
    if(!user) return res.status(404).json({msg : "tidak ada user yang ditemukan"});
    // res.status(200).json(user); 
    if(user.is_verified){
        next();
    }
    else{
        return res.status(403).json({msg : "email dari user " + user.name + " belum terverifikasi !!"});
    }
}

const adminOnly = async(req,res,next) => {
    const arr = ["0105","12474"];
    if(!arr.includes(req.user.role)) return res.status(403).json({msg:"akses dilarang!!"});
    next();
}


module.exports = {auth,verifyEmailUser,adminOnly}
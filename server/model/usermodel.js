const {Sequelize} = require("sequelize");
const db = require("../config/database.js");

const {DataTypes} = Sequelize;

const User = db.define('user',{
    uuid:{
        type : DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    name:{
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
            len : [3, 100]
        }
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
            isEmail : true
        }
    },
    no_hp:{
        type : DataTypes.STRING,
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true,
        }
    },
    role:{
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue : 'https://www.w3schools.com/howto/img_avatar.png'
    },
    is_verified:{
        type : DataTypes.BOOLEAN
    },
    invalidatedToken:{
        type : DataTypes.STRING,
        defaultValue : 0
    },
    verify_email: {
      type: DataTypes.INTEGER
    },
    verify_email_timestamp: {
        type: DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    reset_password: {
      type: DataTypes.INTEGER
    },
    reset_password_date: {
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
}, {
    freezeTableName: true
});

// export default User;
module.exports = User;
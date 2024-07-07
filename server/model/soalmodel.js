const Sequelize = require("sequelize");
const db = require("../config/database.js");
const User = require("./usermodel.js");
const { DataTypes } = Sequelize;

const soal = db.define(
  "soal",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    file: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

User.hasMany(soal);
soal.belongsTo(User, { foreignKey: "userId" });

// export default kuis;
module.exports = soal;

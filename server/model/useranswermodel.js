const Sequelize = require("sequelize");
const db = require("../config/database.js");
const soal = require("./soalmodel.js");
const user = require("./usermodel.js");
const { DataTypes } = Sequelize;

const useranswer = db.define(
  "useranswer",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    soalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    file: {
      type: DataTypes.STRING
    },
    nilai: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    
  },
  {
    freezeTableName: true,
  }
);

soal.hasMany(useranswer);
useranswer.belongsTo(soal, { foreignKey: "soalId" });

user.hasMany(useranswer);
useranswer.belongsTo(user, { foreignKey: "userId" });

// export default soal;
module.exports = useranswer;

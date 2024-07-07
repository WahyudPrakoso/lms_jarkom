const Sequelize = require("sequelize");
const db = require("../config/database.js");
const user = require("./usermodel.js");
const { DataTypes } = Sequelize;

const materi = db.define(
  "materi",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
    },
    file: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
  }
);

user.hasMany(materi);
materi.belongsTo(user, { foreignKey: "userId" });

// export default materi;
module.exports = materi;

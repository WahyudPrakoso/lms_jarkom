const Sequelize = require("sequelize");
const db = require("../config/database.js");
const User = require("./usermodel.js");
const { DataTypes } = Sequelize;

const vidmateri = db.define(
  "vidmateri",
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
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT
    },
    link: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);

User.hasMany(vidmateri);
vidmateri.belongsTo(User, { foreignKey: "userId" });

// export default User;
module.exports = vidmateri;

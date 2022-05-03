const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    caption: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        len: [1]
      }
    },
    // filename: {
    //   QUESTION how does the image get stored?
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'image'
  }
)

module.exports = Image;
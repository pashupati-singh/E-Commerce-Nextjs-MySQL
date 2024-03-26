import { DataTypes } from 'sequelize';
import { sequelize } from '../DB/db.js';

const UserFavouriteCategory = sequelize.define('UserFavouriteCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  favCategory: {
    type: DataTypes.JSON, 
    allowNull: false,
    defaultValue: '[]' 
  }
});

export default UserFavouriteCategory;

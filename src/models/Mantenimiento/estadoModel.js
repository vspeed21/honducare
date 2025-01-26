import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const estadocita = sequelize.define('tbl_estados', {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


export default estadocita;
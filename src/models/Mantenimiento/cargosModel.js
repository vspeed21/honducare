import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const Cargo = sequelize.define('tbl_cargo', {
  id_cargo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: DataTypes.STRING
}, { tableName: 'tbl_cargo' });

export default Cargo;
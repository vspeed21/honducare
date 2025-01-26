import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const Patologia = sequelize.define('tbl_patologias', {
  id_patologia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, { tableName: 'tbl_patologias' });

export default Patologia;
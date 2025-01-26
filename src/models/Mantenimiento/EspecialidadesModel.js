import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const Especialidades = sequelize.define('tbl_especialidades', {
  id_especialidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING
}, { tableName: 'tbl_especialidades' });

export default Especialidades;

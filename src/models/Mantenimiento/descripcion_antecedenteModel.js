import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const DescripcionAntecedente = sequelize.define('tbl_descripcion_antecedente', {
  id_descripcion_antecedente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: DataTypes.STRING,
}, { tableName: 'tbl_descripcion_antecedente' });

export default DescripcionAntecedente;


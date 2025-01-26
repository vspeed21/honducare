import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

  const DescripcionGinecobstretica = sequelize.define('tbl_descripcion_ginecoobstretica', {
    id_descripcion_ginecoobstetrica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: DataTypes.STRING
  }, { tableName: 'tbl_descripcion_ginecoobstretica' });
  
  export default DescripcionGinecobstretica;
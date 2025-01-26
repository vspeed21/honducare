import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

  const Ocupacion = sequelize.define('tbl_ocupacion', {
    id_ocupacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: DataTypes.STRING
  }, { tableName: 'tbl_ocupacion' });
  
  export default Ocupacion;
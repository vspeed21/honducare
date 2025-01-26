import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

  const DescripcionHabitos = sequelize.define('tbl_descripcion_habitos', {
    id_descripcion_habitos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    descripcion: DataTypes.STRING
  }, { tableName: 'tbl_descripcion_habitos' });
  
  export default DescripcionHabitos;
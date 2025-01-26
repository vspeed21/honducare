import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const Sexo = sequelize.define('tbl_sexo', {
    id_sexo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    descripcion: { 
    type:DataTypes.STRING,
    allowNull: false,
  },
}, { tableName: 'tbl_sexo', timestamps: false });
  
  export default Sexo;



import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const Bitacora = sequelize.define('Tbl_ms_bitacora', {
    id_bitacora: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull:   
   false,
      references: {
        model: 'Tbl_usuario',
        key: 'id_usuario'
      }
    },
    accion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  });
  
  export default Bitacora;
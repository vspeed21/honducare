import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const Rol = sequelize.define('tbl_roles', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rol: DataTypes.STRING,
  descripcion: DataTypes.STRING
});

export default Rol;
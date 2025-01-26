import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Usuario from "../Usuario/usuarioModel.js";

const Bitacora = sequelize.define('tbl_bitacora', {
  id_bitacora: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: 'id_usuario' }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  operacion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'tbl_bitacora',
});

Bitacora.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

export default Bitacora;
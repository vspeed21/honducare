import { sequelize } from '../../config/sequelize.config.js';
import { DataTypes } from 'sequelize';
import Especialidades from '../Mantenimiento/EspecialidadesModel.js';
import Rol from '../Seguridad/rolesModel.js';

const Usuario = sequelize.define('tbl_usuarios', {
  numero_identidad: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  direccion1: {
    type: DataTypes.STRING(100),
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nombre_de_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Rol, key: 'id_rol' }
  },
  estado: {
    type: DataTypes.STRING(20),
  },
  correo_electronico: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  fecha_ultima_conexion: {
    type: DataTypes.DATE,
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
  },
  firebase_uid: {
    type: DataTypes.STRING(100),
  },
  id_especialidad: {
    type: DataTypes.INTEGER,
    references: { model: Especialidades, key: 'id_especialidad' }
  }
});

Usuario.belongsTo(Especialidades, { foreignKey: 'id_especialidad', as: 'especialidad' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });


export default Usuario;

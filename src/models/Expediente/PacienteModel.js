import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

import EstadoCivil from '../../models/Mantenimiento/estado_civilModel.js';
import Sexo from '../../models/Mantenimiento/sexoModel.js';
import Ocupacion from '../../models/Mantenimiento/ocupacionModel.js';
import TipoDocumento from './tipo_documento_Model.js';


const Paciente = sequelize.define('tbl_paciente', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_completo: DataTypes.STRING,
  edad: DataTypes.INTEGER,
  nacionalidad: DataTypes.STRING,
  numero_identidad: DataTypes.STRING,
  telefono: DataTypes.STRING,
  correo_electronico: DataTypes.STRING,
  direccion: DataTypes.STRING,
  id_estado_civil: DataTypes.INTEGER,
  id_sexo: DataTypes.INTEGER,
  id_ocupacion: DataTypes.INTEGER,
  fecha_registro: DataTypes.DATE,
  como_se_entero: DataTypes.TEXT,
}, { tableName: 'tbl_paciente' });

// Asociaciones
Paciente.belongsTo(EstadoCivil, { foreignKey: 'id_estado_civil' });
Paciente.belongsTo(Sexo, { foreignKey: 'id_sexo' });
Paciente.belongsTo(Ocupacion, { foreignKey: 'id_ocupacion' });

export default Paciente;

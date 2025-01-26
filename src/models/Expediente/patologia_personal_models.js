import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
const Paciente = import('./PacienteModel');

const PatologiaPersonal = sequelize.define('tbl_patologia_personal', {
  id_patologia_personal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    references: { model: Paciente, key: 'id_paciente' }
  },
  medicamentos: DataTypes.STRING,
  dosis: DataTypes.STRING,
  horario: DataTypes.STRING
}, { tableName: 'tbl_patologia_personal' });

export default PatologiaPersonal;

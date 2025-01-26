import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
const Paciente = import('./PacienteModel');

const PatologiaFamiliar = sequelize.define('tbl_patologia_familiar', {
  id_patologia_familiar: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    references: { model: Paciente, key: 'id_paciente' }
  }
}, { tableName: 'tbl_patologia_familiar' });

export default PatologiaFamiliar;

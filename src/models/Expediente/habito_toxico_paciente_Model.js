import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Paciente from './../../models/Expediente/PacienteModel.js';
import DescripcionHabitos from '../Mantenimiento/descripcion_habitos_Model.js';

const HabitoToxicoPaciente = sequelize.define('tbl_habito_toxico_paciente', {
  id_habito_toxico_paciente: {  // Nueva columna id como clave primaria
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Esto asegura que sea auto-incremental
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    references: { model: Paciente, key: 'id_paciente' }
  },
  id_descripcion_habitos: {
    type: DataTypes.INTEGER,
    references: { model: DescripcionHabitos, key: 'id_descripcion_habitos' }
  }
}, { tableName: 'tbl_habito_toxico_paciente' });

HabitoToxicoPaciente.belongsTo(DescripcionHabitos, { foreignKey: 'id_descripcion_habitos' });


export default HabitoToxicoPaciente;
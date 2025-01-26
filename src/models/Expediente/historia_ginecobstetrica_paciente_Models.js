import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Paciente from './../../models/Expediente/PacienteModel.js';
import DescripcionGinecobstretica from '../Mantenimiento/descripcion_ginecobstetrica_Model.js';

const HistoriaGinecobstetrica = sequelize.define('tbl_historia_ginecoobstetrica_paciente', {
  id_historia_ginecobstretica_paciente: {  // Nueva columna id como clave primaria
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Esto asegura que sea auto-incremental
  },
  id_descripcion_ginecoobstetrica: {
    type: DataTypes.INTEGER,
    references: { model: DescripcionGinecobstretica, key: 'id_descripcion_ginecoobstetrica' }
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    references: { model: Paciente, key: 'id_paciente' }
  }
}, { tableName: 'tbl_historia_ginecoobstetrica_paciente' });


HistoriaGinecobstetrica.belongsTo(DescripcionGinecobstretica, { foreignKey: 'id_descripcion_ginecoobstetrica' });

export default HistoriaGinecobstetrica;

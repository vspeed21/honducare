import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

import Paciente from '../../models/Expediente/PacienteModel.js';
import DescripcionAntecedente from '../Mantenimiento/descripcion_antecedenteModel.js';



const AntecedentesPaciente = sequelize.define('AntecedentePaciente', {
  id_antecedente_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Paciente,
      key: 'id_paciente'
    }
  },
  id_descripcion_antecedente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DescripcionAntecedente,
      key: 'id_descripcion_antecedente'
    }
  }
}, {
  tableName: 'tbl_antecedentes_paciente',
  timestamps: false
});


AntecedentesPaciente.belongsTo(DescripcionAntecedente, { foreignKey: 'id_descripcion_antecedente' });


export default AntecedentesPaciente;
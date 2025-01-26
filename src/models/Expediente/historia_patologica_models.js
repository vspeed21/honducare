import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Patologia from '../../models/Mantenimiento/patologiasModel.js';
import Paciente from '../../models/Expediente/PacienteModel.js';


const HistoriaPersonalPatologica = sequelize.define('HistoriaPersonalPatologica', {
  id_historia_patologica: {
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
  id_patologia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patologia,
      key: 'id_patologia'
    }
  },
  tipo_historia: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['familiar', 'personal']]
    }
  },
  parentesco: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  medicamentos: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dosis: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  horario: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  tableName: 'tbl_historia_patologica'
});

HistoriaPersonalPatologica.belongsTo(Patologia, { foreignKey: 'id_patologia', as: 'patologia' });

export default HistoriaPersonalPatologica;

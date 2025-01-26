import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Cita from '../Cita/citaModel.js';

const preclinica = sequelize.define('tbl_preclinica', {
  id_preclinica: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cita: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  presion_arterial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  frecuencia_cardiaca: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  frecuencia_respiratoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  temperatura: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  peso_actual: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  talla: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  glucometria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

preclinica.belongsTo(Cita, { foreignKey: 'id_cita' });

export default preclinica;

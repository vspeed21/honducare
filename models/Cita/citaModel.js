import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Paciente from '../Expediente/PacienteModel.js';
import EstadoCita from './estado_cita.js';
import Usuario from '../Usuario/usuarioModel.js';

const Cita = sequelize.define('tbl_citas', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    references: { model: Paciente, key: 'id_paciente' }
  },
  id_estado_cita: {
    type: DataTypes.INTEGER,
    references: { model: EstadoCita, key: 'id_estado_cita' }
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: 'id_usuario' }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  motivo_cita: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivo_cancelacion: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
Cita.belongsTo(EstadoCita, { foreignKey: 'id_estado_cita', as: 'estado' });
Cita.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

export default Cita;
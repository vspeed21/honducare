import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import Paciente from '../../models/Expediente/PacienteModel.js';
import Cita from '../../models/Cita/citaModel.js';
import Usuario from '../Usuario/usuarioModel.js';

const Diagnostico = sequelize.define('tbl_diagnosticos', {
  id_diagnostico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cita: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cita,
      key: 'id_cita',
    },
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Paciente,
      key: 'id_paciente',
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id_usuario',
    },
  },

  historia_enfermedad: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  receta: {
    type: DataTypes.STRING,
    allownull: false,
  },
  examen_fisico: {
    type: DataTypes.STRING,
  },
  indicaciones: {
    type: DataTypes.STRING,
  },

  fecha: {
    type: DataTypes.DATE,
    allownull: false,
  },

  diagnostico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.define('Cita', { foreignKey: 'id_cita' });
sequelize.define('Paciente', { foreignKey: 'id_paciente' });
sequelize.define('Usuario', { foreignKey: 'id_usuario' });

Diagnostico.belongsTo(Cita, {
  foreignKey: 'id_cita',
  as: 'cita',
});

Cita.hasMany(Diagnostico, {
  foreignKey: 'id_cita',
  as: 'diagnosticos',
});

Diagnostico.belongsTo(Paciente, {
  foreignKey: 'id_paciente',
  as: 'paciente',
});

Paciente.hasMany(Diagnostico, {
  foreignKey: 'id_paciente',
  as: 'diagnosticos',
});

Diagnostico.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Usuario.hasMany(Diagnostico, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

const diagnosticoModel = sequelize.model('tbl_diagnosticos', Diagnostico);
export default diagnosticoModel;
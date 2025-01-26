import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';
import PatologiaFamiliar from './patologia_familiar_models';
import Patologia from '../Mantenimiento/patologiasModel.js';

const HistoriaFamiliarPatologica = sequelize.define('tbl_historia_familiar_patologica', {
  id_patologia_familiar: {
    type: DataTypes.INTEGER,
    references: { model: PatologiaFamiliar, key: 'id_patologia_familiar' } },
     id_patologia: { type: DataTypes.INTEGER, references: { model: Patologia, key: 'id_patologia' } },
      parentesco: DataTypes.STRING }, { tableName: 'tbl_historia_familiar_patologica' });

export default HistoriaFamiliarPatologica;

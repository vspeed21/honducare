import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const hpp= sequelize.define('tbl_historia_personal_patologica', {
  id_patologia_personal:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_patologia:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const hppModel = sequelize.model('tbl_historia_personal_patologica', hpp);
export default hppModel;
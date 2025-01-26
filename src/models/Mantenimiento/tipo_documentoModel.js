import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const TipoDocumento = sequelize.define('tbl_tipo_documento', {
    id_documento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo_documento: {
        type: DataTypes.STRING,
        allowNull: false   

    }
}, { tableName: 'tbl_tipo_documento', timestamps: false });

export default TipoDocumento;
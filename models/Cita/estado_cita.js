import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

const EstadoCita = sequelize.define('tbl_estado_cita', {
    id_estado_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false, // La descripción no puede ser nula
    },
}, {
    tableName: 'tbl_estado_cita',
});

// Sincronizar el modelo para que se cree en la base de datos


export default EstadoCita;

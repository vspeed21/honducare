// Importaciones usando ES Modules
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno
dotenv.config(); // Si .env está en la raíz del proyecto

// Configurar Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: { timestamps: false },
});

// Función para autenticar y sincronizar la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await sequelize.sync({ alter: true }); // Sincroniza los modelos
    console.log('Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
};

// Exportar módulos
export {
  sequelize,
  syncDatabase,
};

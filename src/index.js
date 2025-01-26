import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { syncDatabase } from './config/sequelize.config.js';

// Importar las rutas
// import crearExpediente from './routes/crearExpediente.js';
import obtenerExpediente from './routes/obtenerExpediente.js';
import eliminarExpediente from './Routes/eliminarExpediente.js';
import actualizarExpediente from './Routes/actualizarExpediente.js';

import crearCitas from './Routes/Citas/crearCitas.js';
import obtenerCita from './Routes/Citas/obtenerCita.js';
import actualizarCita from './Routes/Citas/actualizarCita.js';
import eliminarCita from './Routes/Citas/EliminarCita.js';
import historialCitas from './Routes/Citas/historialCitas.js';
import obtenerCitasdelDia from './Routes/Citas/obtenerCitasdelDia.js';
import cambiarEstado from './Routes/Citas/cambiarEstado.js';

import verificarUsuario from './Routes/Usuarios/verificarUsuario.js';
import crearUsuario from './Routes/Usuarios/crearUsuario.js';

// Mantenimiento
import crearAntecedente from './Routes/Mantenimiento/Antecedentes/antecedentes.js';
import actualizarAntecedentes from './Routes/Mantenimiento/Antecedentes/ActualizarAntecedentes.js';
import eliminarAntecedentes from './Routes/Mantenimiento/Antecedentes/eliminarAntecedentes.js';
import obtenerAntecedentes from './Routes/Mantenimiento/Antecedentes/obtenerAntecedentes.js';
import EspecialidadesRoutes from './Routes/Mantenimiento/especialidades/especialidadesRoutes.js';
import ItinerarioRoutes from './Routes/Mantenimiento/Itinerario/ItinerarioRoutes.js';
import EstadisticasRoutes from './Routes/Mantenimiento/Estadisticas/estadisticasRoutes.js';

import crearCargo from './Routes/Mantenimiento/Cargos/crearCargo.js';
import actualizarCargo from './Routes/Mantenimiento/Cargos/actualizarCargo.js';
import eliminarCargo from './Routes/Mantenimiento/Cargos/eliminarCargo.js';
import obtenerCargo from './Routes/Mantenimiento/Cargos/obtenerCargo.js';

// Otras rutas de mantenimiento
import crearEstadoCivil from './Routes/Mantenimiento/EstadoCivil/crearEstadoCivil.js';
import actualizarEstadoCivil from './Routes/Mantenimiento/EstadoCivil/actualizarEstadoCivil.js';
import eliminarEstadoCivil from './Routes/Mantenimiento/EstadoCivil/eliminarEstadoCivil.js';
import obtenerEstadoCivil from './Routes/Mantenimiento/EstadoCivil/obtenerEstadoCivil.js';

import crearEstadoCita from './Routes/Mantenimiento/EstadoCita/crearEstadoCita.js';
import actualizarEstadoCita from './Routes/Mantenimiento/EstadoCita/actualizarEstadoCita.js';
import eliminarEstadoCita from './Routes/Mantenimiento/EstadoCita/eliminarEstadoCita.js';
import obtenerEstadoCita from './Routes/Mantenimiento/EstadoCita/obtenerEstadoCita.js';

import crearHabitos from './Routes/Mantenimiento/HabitosToxicos/crearHabitos.js';
import actualizarHabitos from './Routes/Mantenimiento/HabitosToxicos/actualizarHabitos.js';
import eliminarHabitos from './Routes/Mantenimiento/HabitosToxicos/eliminarHabitos.js';
import obtenerHabitos from './Routes/Mantenimiento/HabitosToxicos/obtenerHabitos.js';

import crearSexo from './Routes/Mantenimiento/Sexo/crearSexo.js';
import actualizarSexo from './Routes/Mantenimiento/Sexo/actualizarSexo.js';
import eliminarSexo from './Routes/Mantenimiento/Sexo/eliminarSexo.js';
import obtenerSexo from './Routes/Mantenimiento/Sexo/obtenerSexo.js';

import crearGineco from './Routes/Mantenimiento/HistoriaGineco/crearGineco.js';
import actualizarGineco from './Routes/Mantenimiento/HistoriaGineco/ActualizarGineco.js';
import eliminarGineco from './Routes/Mantenimiento/HistoriaGineco/EliminarGineco.js';
import obtenerGineco from './Routes/Mantenimiento/HistoriaGineco/obtenerGineco.js';

import crearOcupacion from './Routes/Mantenimiento/Ocupaciones/crearOcupacion.js'
import actualizarOcupacion from './Routes/Mantenimiento/Ocupaciones/ActualizarOcupacion.js'
import eliminarOcupacion from './Routes/Mantenimiento/Ocupaciones/EliminarOcupacion.js'
import obtenerOcupacion from './Routes/Mantenimiento/Ocupaciones/obtenerOcupacion.js'

import crearPatologia from './Routes/Mantenimiento/Patologias/crearPatologia.js';
import actualizarPatologia from './Routes/Mantenimiento/Patologias/actualizarPatologia.js';
import eliminarPatologia from './Routes/Mantenimiento/Patologias/eliminarPatologia.js';
import obtenerPatologia from './Routes/Mantenimiento/Patologias/obtenerPatologia.js';

import crearPreClinica from './routes/Preclinica/crearPreClinica.js';
import actualizarPreClinica from './routes/Preclinica/actualizarPreClinica.js';
import eliminarPreClinica from './routes/Preclinica/eliminarPreclinica.js';
import obtenerPreClinica from './routes/Preclinica/obtenerPreClinica.js';

import obtenerUsuario from './routes/Usuarios/obtenerUsuario.js';
import actualizarUsuario from './routes/Usuarios/actualizarUsuario.js';
import eliminarUsuario from './routes/Usuarios/eliminarUsuario.js';

import rolesRoutes from './routes/Roles/rolesRoutes.js';
import pacientesRoutes from './routes/Pacientes/Pacientes.js';
import bitacoraRoutes from './routes/Mantenimiento/Bitacora/bitacoraRoutes.js'
import diagnosticoRoutes from './routes/diagnosticoRoutes.js';


// Configuración del servidor
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Sincroniza los modelos antes de iniciar el servidor
    // await syncDatabase();
    // console.log('Sincronización de modelos completada.');

    // Inicia el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
  }
};

startServer();

// Definir rutas

// Diagnostico
app.use('/diagnosticos', diagnosticoRoutes);

// Expedientes
//app.use('/crear', crearExpediente);
app.use('/obtener/expediente', obtenerExpediente);
app.use('/eliminar/expediente', eliminarExpediente);
app.use('/actualizar/expediente', actualizarExpediente);

// Citas
app.use('/crear', crearCitas);
app.use('/obtener', obtenerCita);
app.use('/actualizar/cita', actualizarCita);
app.use('/eliminar/cita', eliminarCita);
app.use('/historial/cita', historialCitas);
app.use('/obtener/cita/hoy', obtenerCitasdelDia);
app.use('/nuevo/estado', cambiarEstado);

// Usuarios
app.use('/Verificar', verificarUsuario);
app.use('/Crear/Usuario', crearUsuario);
app.use('/obtener', obtenerUsuario);
app.use('/actualizar-usuario', actualizarUsuario);
app.use('/eliminar-usuario', eliminarUsuario);

// Mantenimiento
app.use('/crear/antecedente', crearAntecedente);
app.use('/actualizar/antecedentes', actualizarAntecedentes);
app.use('/eliminar/antecedentes', eliminarAntecedentes);
app.use('/obtener/antecedentes', obtenerAntecedentes);
app.use('/especialidad', EspecialidadesRoutes);
app.use('/itinerario', ItinerarioRoutes);
app.use('/estadisticas', EstadisticasRoutes);

// Cargos
app.use('/crear/cargo', crearCargo);
app.use('/actualizar/cargo', actualizarCargo);
app.use('/eliminar/cargo', eliminarCargo);
app.use('/obtener/cargo', obtenerCargo);

// Estado Civil
app.use('/crear/estadoCivil', crearEstadoCivil);
app.use('/actualizar/estadoCivil', actualizarEstadoCivil);
app.use('/eliminar/estadoCivil', eliminarEstadoCivil);
app.use('/obtener/estadoCivil', obtenerEstadoCivil);

// Estado de Cita
app.use('/crear/estadoCita', crearEstadoCita);
app.use('/actualizar/estadoCita', actualizarEstadoCita);
app.use('/eliminar/estadoCita', eliminarEstadoCita);
app.use('/obtener/estadoCita', obtenerEstadoCita);

// Historia Gineco-obstétrica
app.use('/crear/historiaGinecoobstetrica', crearGineco);
app.use('/actualizar/historiaGinecoobstetrica', actualizarGineco);
app.use('/eliminar/historiaGinecoobstetrica', eliminarGineco);
app.use('/obtener/historiaGinecoobstetrica', obtenerGineco);

// Hábitos Tóxicos
app.use('/crear/habitos', crearHabitos);
app.use('/actualizar/habitos', actualizarHabitos);
app.use('/eliminar/habitos', eliminarHabitos);
app.use('/obtener/habitos', obtenerHabitos);

// Ocupaciones
app.use('/crear/ocupaciones', crearOcupacion);
app.use('/actualizar/ocupaciones', actualizarOcupacion);
app.use('/eliminar/ocupaciones', eliminarOcupacion);
app.use('/obtener/ocupaciones', obtenerOcupacion);

// Patologías
app.use('/patologias/crear', crearPatologia);
app.use('/actualizar/patologias', actualizarPatologia);
app.use('/eliminar/patologias', eliminarPatologia);
app.use('/obtener/patologias', obtenerPatologia);

// Tipo de Documento
// app.use('/crear/tipoDocumento', crearTipoDoc);
// app.use('/actualizar/tipoDocumento', actualizarTipoDoc);
// app.use('/eliminar/tipoDocumento', eliminarTipoDoc);
// app.use('/obtener/tipoDocumento', obtenerTipoDoc);

// Sexo
app.use('/crear/sexo', crearSexo);
app.use('/actualizar/sexo', actualizarSexo);
app.use('/eliminar/sexo', eliminarSexo);
app.use('/obtener/sexo', obtenerSexo);

// Preclínica
app.use('/crear', crearPreClinica);
app.use('/actualizar/preclinica', actualizarPreClinica);
app.use('/eliminar/preclinica', eliminarPreClinica);
app.use('/preclinica', obtenerPreClinica);

// Roles
app.use('/crear/rol', rolesRoutes);
app.use('/actualizar/rol', rolesRoutes);
app.use('/eliminar/rol', rolesRoutes);
app.use('/obtener/roles', rolesRoutes);

// Pacientes
app.use('/pacientes', pacientesRoutes);
app.use('/bitacora', bitacoraRoutes);

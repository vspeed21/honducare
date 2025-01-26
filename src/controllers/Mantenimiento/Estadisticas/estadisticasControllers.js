import { Op, Sequelize } from "sequelize";
import Cita from "../../../models/Cita/citaModel.js";
import Paciente from "../../../models/Expediente/PacienteModel.js";
import Usuario from "../../../models/Usuario/usuarioModel.js";
import Especialidades from "../../../models/Mantenimiento/EspecialidadesModel.js";
import Patologia from "../../../models/Mantenimiento/patologiasModel.js";
import HistoriaPersonalPatologica from "../../../models/Expediente/historia_patologica_models.js";

export async function getEstadisticas(req, res) {
  const fechaActual = new Date();

  const mesActual = fechaActual.getMonth() + 1;
  // Si el mes actual es ENERO cambiar por diciembre (12) para el mes anterior y asi obtener las citas.
  let mesAnterior = mesActual == 1 ? 12 : mesActual - 1;

  try {
    const citasMesActual = await Cita.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "fecha"')), mesActual),
        ]
      }
    });
    const citasMesAnterior = await Cita.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "fecha"')), mesAnterior),
        ]
      }
    });
    const pacientes = await Paciente.findAll({
      where: {
        id_sexo: {
          [Op.ne]: null,
        }
      }
    });
    const pacientesMesActual = await Paciente.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "fecha_registro"')), mesActual),
        ]
      }
    });
    const pacientesMesAnterior = await Paciente.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "fecha_registro"')), mesAnterior),
        ]
      }
    });

    const pacientesMasculinos = await Paciente.findAll({
      where: {
        id_sexo: 1,
      },
      // group: ['fecha_registro'],
    });

    const pacientesFemeninos = await Paciente.findAll({
      where: {
        id_sexo: 2,
      },
    });

    // Pacientes por especialidad.
    // 1. Obtener todas las citas.

    const citas = await Cita.findAll({
      where: { id_estado_cita: 4 }
    });

    // 2. Obtener las citas agendadas, agruparlas y contarlas segun la especialidad.
    const citasEsp = await Cita.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id_cita')), 'total_citas'],
        [Sequelize.col('usuario->especialidad.nombre'), 'especialidad'],
      ],
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: [],
          include: [
            {
              model: Especialidades,
              as: 'especialidad',
              attributes: [],
            },
          ],
        },
      ],
      where: { id_estado_cita: 4 },
      group: ['usuario->especialidad.nombre'],
      order: [[Sequelize.literal('total_citas'), 'DESC']],
    });

    // Pacientes por enfermedad
    //1. Obtener todas las patologias
    const patologias = await HistoriaPersonalPatologica.findAll();

    // 2. Obtener la historia patologica de los pacientes para validar cuantos tienen cada patologia.
    const patologiasPacientes = await HistoriaPersonalPatologica.findAll({
      attributes: [
        [Sequelize.col('patologia.descripcion'), 'descripcion'],
        [Sequelize.fn('COUNT', Sequelize.col('HistoriaPersonalPatologica.id_paciente')), 'total_pacientes'],
      ],
      include: [
        {
          model: Patologia,
          as: 'patologia',
          attributes: [],
        },
      ],
      group: ['patologia.descripcion', 'HistoriaPersonalPatologica.id_patologia'],
      // order: ['patologia.id_patologia', 'DESC'],
    });

    const pacientesMas = agruparPacientesPorGenero(pacientesMasculinos, 2025);
    const pacientesFem = agruparPacientesPorGenero(pacientesFemeninos, 2025);

    // Calcula de porcentajes
    // Citas
    const diferenciaCitas = citasMesActual.length - citasMesAnterior.length;
    const porcentajeCitas = ((diferenciaCitas / citasMesAnterior.length) * 100).toFixed(2);

    // Pacientes
    const diferenciaPacientes = pacientesMesActual.length - pacientesMesAnterior.length;
    const porcentajePacientes = ((diferenciaPacientes / pacientesMesAnterior.length) * 100).toFixed(2);

    // Pacientes por sexo
    const porcentajeMasculino = ((pacientesMasculinos.length / pacientes.length) * 100).toFixed(0);
    const porcentajeFemenino = ((pacientesFemeninos.length / pacientes.length) * 100).toFixed(0);

    // Citas por especialidad
    const citasPorEspecialidad = citasEsp.reduce((acc, item) => {
      acc[item.dataValues.especialidad] = item.dataValues.total_citas;
      return acc;
    }, {});

    const porcentajes = Object.entries(citasPorEspecialidad).map(([especialidad, total]) => {
      const porcentaje = (total / citas.length) * 100;
      return { especialidad, porcentaje: porcentaje.toFixed(2) };
    });

    // Pacientes por patologias
    const pacientesPatologias = patologiasPacientes.reduce((acc, item) => {
      acc[item.dataValues.descripcion] = item.dataValues.total_pacientes;
      return acc;
    }, {});


    // Pacientes por patologias.
    const porcentajePatologias = Object.entries(pacientesPatologias).map(([desc, total]) => {
      console.log({ desc, total });
      const porcentaje = (total / patologias.length) * 100;
      return {
        nombre: desc,
        total: porcentaje,
      }
    });

    const patologiasLabel = porcentajePatologias.map(pato => pato.nombre);
    const patologiasNumber = porcentajePatologias.map(pato => pato.total);

    res.json({
      message: 'Consulta exitosa',
      patologias: {
        patologiasLabel,
        patologiasNumber,
      },
      citasEspecialidad: porcentajes,
      cantidadCitasMesAnterior: citasMesAnterior.length,
      cantidadCitasMesActual: citasMesActual.length,
      porcentajeCitas,
      cantidadPacientes: pacientes.length,
      cantidadPacientesMesAnterior: pacientesMesAnterior.length,
      cantidadPacientesMesActual: pacientesMesActual.length,
      porcentajePacientes,
      cantidadPacientesMasculinos: pacientesMasculinos.length,
      cantidadPacientesFemeninos: pacientesFemeninos.length,
      porcentajeMasculino,
      porcentajeFemenino,
      pacientesMas,
      pacientesFem,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }

}

export async function getPacientesGeneroYear(req, res) {
  const { year } = req.query;

  try {
    const pacientesMasculinos = await Paciente.findAll({
      where: {
        id_sexo: 1,
      },
    });

    const pacientesFemeninos = await Paciente.findAll({
      where: {
        id_sexo: 2,
      },
    });

    const pacientesMas = agruparPacientesPorGenero(pacientesMasculinos, year);
    const pacientesFem = agruparPacientesPorGenero(pacientesFemeninos, year);

    res.json({
      pacientesMas,
      pacientesFem,
    })

  } catch (error) {
    console.log(error);
  }
}

function agruparPacientesPorGenero(pacientes, yearP) {
  const meses = Array(12).fill(0); // Array para almacenar la cantidad por mes (Enero = 0, Diciembre = 11)

  pacientes.forEach(paciente => {
    const fecha = paciente.fecha_registro;
    if (fecha) {
      const [year, month] = fecha.split('-');
      if (parseInt(year) == yearP) {
        const mes = parseInt(month, 10);
        if (!isNaN(mes)) {
          meses[mes - 1] += 1;
        }
      }
    }
  });
  return meses;
}

import EstadoCita from '../../../models/Cita/estado_cita.js'; // Ajusta la ruta a tu modelo

// Controlador para gestionar estados
const estadoController = {
    // Obtener todos los estados
    obtenerTodosLosEstados: async (req, res) => {
        try {
            const estados = await EstadoCita.findAll();
            res.json(estados);
        } catch (error) {
            console.error('Error al obtener los estados:', error.message);
            res.status(500).json({ error: 'Error al obtener los estados', details: error.message });
        }
    },

    // Obtener un estado por ID
    obtenerEstadoPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const estado = await EstadoCita.findByPk(id);

            if (!estado) {
                return res.status(404).json({ message: 'Estado no encontrado' });
            }

            res.json(estado);
        } catch (error) {
            console.error('Error al obtener el estado:', error.message);
            res.status(500).json({ error: 'Error al obtener el estado', details: error.message });
        }
    }
};

export default estadoController;
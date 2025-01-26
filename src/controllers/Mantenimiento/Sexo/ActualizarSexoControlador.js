import Sexo from '../../../models/Mantenimiento/sexoModel.js';

// Controlador para gestionar sexos
const sexoController = {
    // Actualizar un sexo
    actualizarSexo: async (req, res) => {
        const { id_sexo } = req.params;
        const { descripcion } = req.body;

        try {
            // Encuentra el sexo por ID
            const sexo = await Sexo.findByPk(id_sexo);

            if (!sexo) {
                return res.status(404).json({ error: 'Sexo no encontrado' });
            }

            // Actualiza los datos del sexo
            await sexo.update({
                descripcion
            });

            res.status(200).json({ message: 'Sexo actualizado exitosamente', data: sexo });
        } catch (error) {
            console.error('Error al actualizar el sexo:', error.message);
            res.status(500).json({ error: 'Error al actualizar el sexo', details: error.message });
        }
    }
};

export default sexoController;
import DescripcionAntecedente from'../../../models/Mantenimiento/descripcion_antecedenteModel.js';

// Controlador para gestionar antecedentes
const antecedentesController = {
    // Eliminar un antecedente
    eliminarAntecedente: async (req, res) => {
        const { id } = req.params;

        try {
            const antecedenteEliminado = await DescripcionAntecedente.destroy({
                where: { id_descripcion_antecedente: id }
            });

            if (antecedenteEliminado) {
                res.status(200).json({ message: 'Antecedente eliminado exitosamente' });
            } else {
                res.status(404).json({ error: 'Antecedente no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el antecedente:', error.message);
            res.status(500).json({ error: 'Error al eliminar el antecedente', details: error.message });
        }
    }
};

export default antecedentesController;
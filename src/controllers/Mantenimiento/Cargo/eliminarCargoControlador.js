import Cargo from '../../../models/Mantenimiento/cargosModel.js'; // Ajusta la ruta a tu modelo

// Eliminar un cargo por ID
const deleteCargo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await Cargo.destroy({ where: { id_cargo: id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Cargo no encontrado' });
        }

        res.status(200).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el cargo' });
    }
};

export default deleteCargo;
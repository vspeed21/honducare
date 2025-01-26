import DescripcionHabitos from '../../../models/Mantenimiento/descripcion_habitos_Model.js';

const HTController = {
updateDescripcionHabitos : async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({ message: 'La descripción es requerida' });
        }

        const [updatedRows, [updatedDescripcion]] = await DescripcionHabitos.update(
            { descripcion },
            {
                where: { id_descripcion_habitos: id },
                returning: true,
            }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Descripción no encontrada' });
        }

        res.json(updatedDescripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la descripción de hábito' });
    }
}
};

export default HTController;
import HabitoToxicoPaciente from '../../../models/Mantenimiento/descripcion_habitos_Model.js'; // Ajusta la ruta a tu modelo

// Obtener todos los hábitos tóxicos
const HTController = {
getAllHabitosToxicos : async (req, res) => {
    try {
        const descripcion = await HabitoToxicoPaciente.findAll();
        res.json(descripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los hábitos tóxicos' });
    }
},

// Obtener un hábito tóxico por ID
getHabitoToxicoById : async (req, res) => {
    try {
        const { id } = req.params;
        const descripcion = await HabitoToxicoPaciente.findByPk(id);

        if (!descripcion) {
            return res.status(404).json({ message: 'Hábito tóxico no encontrado' });
        }

        res.json(descripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el hábito tóxico' });
    }
}
};

export default HTController;
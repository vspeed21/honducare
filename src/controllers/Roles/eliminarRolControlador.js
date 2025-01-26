import Rol from '../../models/Seguridad/rolesModel.js';

// Controlador para gestionar antecedentes
const rolesController = {
    // Eliminar un antecedente
    eliminarRol: async (req, res) => {
        const { id_roles } = req.params;

        try {
            const rolEliminado = await Rol.destroy({
                where: { id_rol: id_roles }
            });

            if (rolEliminado) {
                res.status(200).json({ message: 'Rol eliminado exitosamente' });
            } else {
                res.status(404).json({ error: 'Rol no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el rol:', error.message);
            res.status(500).json({ error: 'Error al eliminar el antecedente', details: error.message });
        }
    }
};

export default rolesController;
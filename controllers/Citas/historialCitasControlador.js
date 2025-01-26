// Obtener todas las citas de un paciente

const historialCitasControlador = {
historialcitasPaciente : async (req, res) => {
  const { id_paciente } = req.params;

  try {
    const query = "SELECT * FROM Tbl_citas WHERE id_paciente = $1;";
    const { rows } = await db.query(query, [id_paciente]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las citas del paciente" });
  }
}
};
export default historialCitasControlador;

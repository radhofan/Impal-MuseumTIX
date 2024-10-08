// pages/api/delete.js
import pool from '../../db/db'; 

export default async function handler(req, res) {
  try {
    const { id } = req.body; 

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const [result] = await pool.query('DELETE FROM testtable1 WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No record found with this ID' });
    }

    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
}

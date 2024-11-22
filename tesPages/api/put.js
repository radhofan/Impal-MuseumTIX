// pages/api/put.js
import pool from '../../tesDb/db'; 

export default async function handler(req, res) {
  try {
    const { id, nama } = req.body; 

    if (!id || !nama) {
      return res.status(400).json({ message: 'ID and name are required' });
    }

    const [result] = await pool.query('UPDATE testtable1 SET nama = ? WHERE id = ?', [nama, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No record found with this ID' });
    }

    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
}

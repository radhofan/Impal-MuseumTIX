// pages/api/post.js
import pool from '../../tesDb/db'; 

export default async function handler(req, res) {
  try {
    const { nama } = req.body; 

    if (!nama) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [result] = await pool.query('INSERT INTO testtable1 (nama) VALUES (?)', [nama]); 
    res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error inserting data', error: error.message });
  }
}

// pages/api/get.js
import pool from '../../db/db'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM testtable1');
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No data found' });
      }
      res.status(200).json(rows);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

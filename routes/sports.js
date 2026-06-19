const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports');
    res.json({ status: 'success', message: 'Data retrieved successfully', data: rows });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ status: 'error', message: 'Data not found' });
    res.json({ status: 'success', message: 'Data retrieved successfully', data: rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, category, difficulty, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO sports (name, category, difficulty, description) VALUES (?, ?, ?, ?)',
      [name, category, difficulty, description]
    );
    const [rows] = await db.query('SELECT * FROM sports WHERE id = ?', [result.insertId]);
    res.status(201).json({ status: 'success', message: 'Data created successfully', data: rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { name, category, difficulty, description } = req.body;
  try {
    await db.query(
      'UPDATE sports SET name = ?, category = ?, difficulty = ?, description = ? WHERE id = ?',
      [name, category, difficulty, description, req.params.id]
    );
    const [rows] = await db.query('SELECT * FROM sports WHERE id = ?', [req.params.id]);
    res.json({ status: 'success', message: 'Data updated successfully', data: rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM sports WHERE id = ?', [req.params.id]);
    res.json({ status: 'success', message: 'Data deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
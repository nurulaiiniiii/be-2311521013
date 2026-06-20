const express = require('express');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
require('dotenv').config();
const db = require('./db');
const sportsRoutes = require('./routes/sports');

const app = express();
app.use(cors());
app.use(express.json());

// GET /health
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      status: 'success',
      message: 'Backend is running',
      database: 'connected',
      student: {
        name: 'Nurul Aini',
        nim: '2311521013'
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Backend is running, but database is not connected',
      database: 'disconnected',
      student: {
        name: 'Nurul Aini',
        nim: '2311521013'
      }
    });
  }
});

// GET /schema
app.get('/schema', (req, res) => {
  res.json({
    student: {
      name: 'Nurul Aini',
      nim: '2311521013'
    },
    resource: {
      name: 'sports',
      label: 'Data Olahraga',
      description: 'Aplikasi untuk mengelola data olahraga'
    },
    fields: [
      { name: 'name', label: 'Nama Olahraga', type: 'text', required: true, showInTable: true },
      { name: 'category', label: 'Kategori', type: 'text', required: true, showInTable: true },
      { name: 'difficulty', label: 'Tingkat Kesulitan', type: 'text', required: true, showInTable: true },
      { name: 'description', label: 'Deskripsi', type: 'text', required: false, showInTable: false }
    ],
    endpoints: {
      list: '/sports',
      detail: '/sports/{id}',
      create: '/sports',
      update: '/sports/{id}',
      delete: '/sports/{id}'
    }
  });
});

// Routes
app.use('/sports', sportsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
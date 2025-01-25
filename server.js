   // server.js
   const express = require('express');
   const { Sequelize } = require('sequelize');
   const { pool } = require('./db/pool');

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Set up Sequelize to connect to PostgreSQL
   const sequelize = new Sequelize('inventory', 'postgres', 'postgres', {
       host: 'localhost',
       dialect: 'postgres'
   });

   // Test the database connection
   sequelize.authenticate()
       .then(() => {
           console.log('Connection to the database has been established successfully.');
       })
       .catch(err => {
           console.error('Unable to connect to the database:', err);
       });

   app.get('/', (req, res) => {
       res.send('Hey let\'s start!');
   });

   /*
   2 tables: categories and items
   CRUD:Create/Read/Update/Delete
   */

   app.post('/item',async (req, res)=>{
    const { newCategory } = req.body;
    try {
        const result = await pool.query('INSERT INTO items (item_name) VALUES ($1) RETURNING *', [newCategory]);
        res.send(`Username saved: ${result.rows[0].category_name}`);
    } catch (error) {
        console.error('Error saving username:', error);
        res.status(500).send('Error saving username');
    }
   })

   app.get('/categories', (req, res) => {
    res.send('checking categories...');
});

app.get('/allitems', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM items');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  app.get('/allcategories', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM categories');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
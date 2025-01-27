   // server.js
   const express = require('express');
   const { Sequelize } = require('sequelize');
   const { pool } = require('./db/pool');

   const app = express();
   const PORT = process.env.PORT || 3000;
   // Middleware to parse form data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON (if needed for API requests)
app.use(express.json());

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

  app.get('/new', (req, res) => {
    res.send(`
        <form action="/newcategory" method="POST">
            <label for="categories">Add new category:</label>
            <input type="text" name="name" required>
            <button type="submit">Submit</button>
        </form>
                <form action="/newitem" method="POST">
            <label for="items">Add new item:</label>
            <input type="text" name="name" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/newcategory', async (req, res) => {
  console.log(req);
  const { name } = req.body;
  try {
      const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
      res.send(`Category saved: ${result.rows[0].name}`);
  } catch (error) {
      console.error('Error saving category:', error);
      res.status(500).send('Error saving category');
  }
});

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
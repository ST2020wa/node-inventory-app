   // server.js
   const express = require('express');
   const { Sequelize } = require('sequelize');
   const { pool } = require('./db/pool');

   const app = express();
   const PORT = process.env.PORT || 3000;
   const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

   app.get('/allitems', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          items.id,
          items.item_name AS name,
          categories.name AS category_name
        FROM items
        JOIN categories ON items.item_categories = categories.id
      `);
      
      const transformedItems = result.rows.map(item => ({
        id: item.id,
        name: item.name,
        categoryName: item.category_name // Now using category name instead of ID
      }));
      
      res.json(transformedItems);
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
            <label for="categories">category:</label>
            <input type="text" name="category" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/newcategory', async (req, res) => {
  const { name } = req.body;
  try {
      const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
      res.json({ message: `Category saved: ${result.rows[0].name}`, data: result.rows[0] });
  } catch (error) {
      console.error('Error saving category:', error);
      res.status(500).send('Error saving category');
  }
});

app.post('/newitem', async (req, res) => {
  const { item_name, item_categories } = req.body;
    // Input validation
    if (!item_name || !item_categories) {
      console.log(item_name, item_categories)
      return res.status(400).json({ 
        message: 'Both item_name and item_category are required' 
      });
    }
  try {
      const result = await pool.query('INSERT INTO items (item_name, item_categories) VALUES ($1, $2) RETURNING *', [item_name,item_categories]);
      res.json({ 
        message: 'Item saved successfully',
        savedItem: result.rows[0]
      });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ 
      message: 'Error saving item',
      error: error.message
    });
  }
});

app.delete('/deletecategory', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    // TODO: First delete associated items (if you have foreign key constraints)
    // await pool.query('DELETE FROM items WHERE category_id = (SELECT id FROM categories WHERE name = $1)', [name]);
    // Then delete the category
    const result = await pool.query('DELETE FROM categories WHERE name = $1 RETURNING *', [name]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ 
      message: 'Category deleted successfully',
      deletedCategory: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category' });
  }
});

app.delete('/deleteItem', async(req,res)=>{
  const {id} = req.body;
  if(!id){
    return res.status(400).json({message: 'Item id is required'});
  }
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    if(result.rowCount === 0){
      return res.status(404).json({message: 'Item not found'});
    }
    res.json({
      message: 'Item deleted successfully',
      deletedItem: result.rows[0]
    });
  } catch (error){
    console.error('Error deleting item: ', error);
    res.status(500).json({message: 'Error deleting item'});
  }
});

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   // server.js
   const express = require('express');
   const { Sequelize } = require('sequelize');

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Set up Sequelize to connect to PostgreSQL
   const sequelize = new Sequelize('inventoryapp', 'postgres', 'postgres', {
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

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
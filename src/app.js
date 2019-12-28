const fs = require('fs');
const path = require('path');
const express = require('express');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const { accounts, users, writeJSON } = require('./data');


const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts });
})

app.get('/profile', (req, res) => {
  const [user] = users;
  res.render('profile', { user });
});



app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
})

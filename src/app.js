const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), { encoding: 'UTF8' });
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), { encoding: 'UTF8' });
const users = JSON.parse(userData);

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts });
})
app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
})
app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
})
app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
})
app.get('/profile', (req, res) => {
  const [user] = users;
  res.render('profile', { user });
});


app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
})

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

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
app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'UTF8');
  res.render('transfer', { message: "Transfer Completed" });
});
app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});
app.post('/payment', (req, res) => {
  const {amount} = req.body;
  accounts.credit.balance -=parseInt(amount);
  accounts.credit.available +=parseInt(amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'UTF8');
  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});


app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
})

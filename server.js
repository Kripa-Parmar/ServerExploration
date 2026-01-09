const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());

let accounts = [
    { id: 1, username: 'admin', email: 'admin@example.com' }
];
let nextId = 2;

app.get('/api/accounts', (req, res) => {
    res.json(accounts);
});

app.post('/api/accounts', (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    const newAccount = {
        id: nextId++,
        username,
        email
    };

    accounts.push(newAccount);

    res.status(201).json({
        message: 'Account created successfully',
        item: newAccount
    });
});


app.put('/api/accounts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { username, email } = req.body;

    const index = accounts.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Account not found' });
    }

    accounts[index] = {
        ...accounts[index],
        username,
        email
    };

    res.status(200).json({
        message: 'Account updated successfully',
        item: accounts[index]
    });
});

app.delete('/api/accounts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = accounts.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Account not found' });
    }

    const deletedAccount = accounts.splice(index, 1)[0];

    res.status(200).json({
        message: 'Account deleted successfully',
        item: deletedAccount
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
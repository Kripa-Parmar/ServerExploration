
export default App;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());


let items = ['hello world'];


app.get('/api/data', (req, res) => {
    res.json(items);
});


app.post('/api/data', (req, res) => {
    const { item } = req.body;

    if (!item) {
        return res.status(400).json({ message: 'Item is required' });
    }

    items.push(item);

    res.status(201).json({
        message: 'Item created successfully',
        item
    });
});


app.put('/api/data/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { item } = req.body;

    if (index < 0 || index >= items.length) {
        return res.status(404).json({ message: 'Item not found' });
    }

    items[index] = item;

    res.status(200).json({
        message: 'Item updated successfully',
        item
    });
});


app.delete('/api/data/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (index < 0 || index >= items.length) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const deletedItem = items.splice(index, 1);

    res.status(200).json({
        message: 'Item deleted successfully',
        item: deletedItem[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});





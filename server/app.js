const express = require('express');
const router = require('./routes/inventory');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/v1/items', router);

app.listen(port, () => console.log("listening on:" + " " + port));
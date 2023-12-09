const asyncWrapper = require('../middleware/async');
const pool = require('../db');

const getItems = asyncWrapper(async (req, res, next) => {
    pool.query('SELECT * FROM items LEFT JOIN armor USING (item_id) LEFT JOIN consumables USING (item_id) LEFT JOIN weapon USING (item_id)', (error, results) => {
        console.log(results)
        res.status(200).json(results.rows);
    });
});

const addItem = asyncWrapper(async (req, res, next) => {
    const { name, description, quality, armor, category, type, damage } = req.body;

    const { rows } = await pool.query(`INSERT INTO items(name, description, category) VALUES($1, $2, $3) RETURNING item_id`, [name, description, category]);

    const itemId = rows[0].item_id;
    console.log(itemId)

    if (category === 'weapon') {
        await pool.query(`INSERT INTO weapon(item_id, quality, damage) VALUES($1, $2, $3)`, [itemId, quality, damage]);
    } else if (category === 'armor') {
        await pool.query(`INSERT INTO armor(item_id, quality, armor) VALUES($1, $2, $3)`, [itemId, quality, armor]);
    } else if (category === 'consumables') {
        await pool.query(`INSERT INTO consumables(item_id, type) VALUES($1, $2)`, [itemId, type]);
    }

    res.status(201).send('success!');
});

module.exports = { getItems, addItem };
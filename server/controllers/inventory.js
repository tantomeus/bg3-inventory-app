const asyncWrapper = require('../middleware/async');
const pool = require('../db');

const getItems = asyncWrapper(async (req, res, next) => {
    pool.query('SELECT * FROM items LEFT JOIN armor USING (item_id) LEFT JOIN consumables USING (item_id) LEFT JOIN weapon USING (item_id)', (error, results) => {
        res.status(200).json(results.rows);
    });
});

const addItem = asyncWrapper(async (req, res, next) => {
    const { name, description, quality, armor, category, type, damage } = req.body;

    const { rows } = await pool.query(`INSERT INTO items(name, description, category) VALUES($1, $2, $3) RETURNING item_id`, [name, description, category]);

    const itemId = rows[0].item_id;

    if (category === 'weapon') {
        await pool.query(`INSERT INTO weapon(item_id, quality, damage) VALUES($1, $2, $3)`, [itemId, quality, damage]);
    } else if (category === 'armor') {
        await pool.query(`INSERT INTO armor(item_id, quality, armor) VALUES($1, $2, $3)`, [itemId, quality, armor]);
    } else if (category === 'consumables') {
        await pool.query(`INSERT INTO consumables(item_id, type) VALUES($1, $2)`, [itemId, type]);
    }

    res.status(201).send('success!');
});

const editItem = asyncWrapper(async (req, res, next) => {
    const { name, description, quality, armor, category, type, damage, item_id } = req.body;

    await pool.query(`UPDATE items SET name = $1, description = $2 WHERE item_id = $3`, [name, description, item_id]);

    if (category === 'weapon') {
        await pool.query(`UPDATE weapon SET quality = $2 damage = $3 WHERE item_id = $1`, [item_id, quality, damage]);
    } else if (category === 'armor') {
        await pool.query(`UPDATE armor SET quality = $2 armor = $3 WHERE item_id = $1`, [item_id, quality, armor]);
    } else if (category === 'consumables') {
        await pool.query(`UPDATE consumables SET type = $2 WHERE item_id = $1 `, [item_id, type]);
    }

    res.status(201).send('success!');
});

const deleteItem = asyncWrapper(async (req, res, next) => {
    const { item_id, category } = req.body;

    if (category === 'weapon') {
        await pool.query(`DELETE FROM weapon WHERE item_id = $1`, [item_id]);
    } else if (category === 'armor') {
        await pool.query(`DELETE FROM armor WHERE item_id = $1`, [item_id]);
    } else if (category === 'consumables') {
        await pool.query(`DELETE FROM consumables WHERE item_id = $1 `, [item_id]);
    }

    await pool.query(`DELETE FROM items WHERE item_id = $1`, [item_id]);

    res.status(201).send('success!');
});

module.exports = { getItems, addItem, editItem, deleteItem };
import { pool } from "../database.js";
;

export default (req, res) => {
    const table = req.params.tableName
    pool.query(`SELECT * FROM ${table};`, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    })
};

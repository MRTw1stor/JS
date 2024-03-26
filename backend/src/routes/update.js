import { pool } from "../database.js";

export default (req, res) => {
    const body = req.body
    pool.query(
        `CALL update_moving(${body.param});`,
        (err, rows, fields) => {
            if (err) throw err;
            res.json({});
        }
    );
}
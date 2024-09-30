import { pool } from "../database.js";

export default (req, res) => {
    const params = req.params.params
    const param = params.split(",")
    pool.query(
        `DELETE FROM ${param[0]} WHERE ${param[1]}=${param[2]};`,
        (err, rows, fields) => {
            if (err) throw err;
            if (rows.affectedRows === 0)
                return res.json({ error: "Item not found" });
            res.json({});
        }
    );
}; 
import { pool } from "../../database.js";

export default (req, res) => {
    const table = req.params.tableName
    const body = req.body
    if(table == "workstation"){
        pool.query(
            `SELECT togglestationstatus('${body.param1}');`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
}
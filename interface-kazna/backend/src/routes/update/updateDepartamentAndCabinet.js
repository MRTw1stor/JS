import { pool } from "../../database.js";

export default (req, res) => {
    const table = req.params.tableName
    const body = req.body
    if(table == "accountingequipment"){
        pool.query(
            `SELECT updatedepartmentandcabinet('${body.param1}', '${body.param2}', '${body.param3}');`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
}
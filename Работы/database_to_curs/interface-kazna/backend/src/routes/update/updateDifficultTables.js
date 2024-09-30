import { pool } from "../../database.js";

export default (req, res) => {
    const table = req.params.tableName
    const body = req.body
    if(table == "monitormodels"){
        pool.query(
            `SELECT updatedifficulttables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}', '${body.param5}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "disksmodels"){
        pool.query(
            `SELECT updatedifficulttables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}', '${body.param5}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
};
import { pool } from "../database.js";

export default (req, res) => {
    const table = req.params.tableName
    const body = req.body
    if(table == "author"){
        pool.query(
            `CALL add_author('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}');`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "genre"){
        pool.query(
            `CALL add_genre('${body.param1}', '${body.param2}');`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "books"){
        pool.query(
            `CALL add_book('${body.param1}', ${body.param2}, ${body.param3});`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "quantitybooks"){
        pool.query(
            `CALL add_book_quantity(${body.param1}, ${body.param2});`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "readers"){
        pool.query(
            `CALL add_reader('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}', 
            '${body.param5}', '${body.param6}', '${body.param7}', '${body.param8}','${body.param9}');`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "moving"){
        pool.query(
            `CALL add_moving(${body.param1}, ${body.param2}, '${body.param3}');`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
};

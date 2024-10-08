import { pool } from "../../database.js";

export default (req, res) => {
    const table = req.params.tableName
    const body = req.body
    if(table == "departments"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "monitorbrands"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "disksbrands"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "stantionsmodels"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "operatingsystems"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "processors"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "diskscapasity"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "ram"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "conturs"){
        pool.query(
            `SELECT updateeasytables('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
};

import { pool } from "../database.js";

export default (req, res) => {
    const table = req.params.tableName
    const body = req.body
    if(table == "workstation"){
        pool.query(
            `CALL insertworkstation('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}', 
            '${body.param5}', '${body.param6}', '${body.param7}', '${body.param8}', '${body.param9}', '${body.param10}', 
            '${body.param11}', '${body.param12}', '${body.param13}', '${body.param14}', '${body.param15}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "accountingequipment"){
        pool.query(
            `CALL insertaccountingequipment('${body.param1}', '${body.param2}', '${body.param3}', '${body.param4}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "monitorbrands"){
        pool.query(
            `CALL insertmonitorbrands('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "monitormodels"){
        pool.query(
            `CALL insertmonitormodels('${body.param1}', '${body.param2}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "diskscapasity"){
        pool.query(
            `CALL insertdiskscapasity('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "disksbrands"){
        pool.query(
            `CALL insertdisksbrands('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "disksmodels"){
        pool.query(
            `CALL insertdisksmodels('${body.param1}', '${body.param2}', '${body.param3}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "stantionsmodels"){
        pool.query(
            `CALL insertstantionsmodels('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "operatingsystems"){
        pool.query(
            `CALL insertoperatingsystems('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "processors"){
        pool.query(
            `CALL insertprocessors('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "ram"){
        pool.query(
            `CALL insertram('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "departments"){
        pool.query(
            `CALL insertdepartments('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
    else if(table == "writeoffworkstations"){
        pool.query(
            `CALL insertwriteoffworkstations('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }

    else if(table == "deletedworkstations"){
        pool.query(
            `CALL insertdeletedworkstations('${body.param1}')`,
            (err, rows, fields) => {
                if (err) throw err;
                res.json({});
            }
        );
    }
};

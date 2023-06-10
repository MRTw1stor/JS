import { connection } from "../database.js";

export default ({ req, res }) => {
    connection.query("SELECT * FROM items;", (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
}
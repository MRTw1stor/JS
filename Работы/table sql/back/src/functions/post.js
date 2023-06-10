import { connection } from "../database.js";

export default (req, res) => {
    connection.query(
        "INSERT INTO items (name, surname, secondname, birthday, faculty) VALUE (?,?,?,?,?);",
        [req.body.name,req.body.surname,req.body.secondname,req.body.birthday,req.body.faculty,],
        (err, rows, fields) => {
            if (err) throw err;
            res.json({});
        }
    )
}
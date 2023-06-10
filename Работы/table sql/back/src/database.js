import mysql from "mysql"

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test"
})

connection.connect()
connection.query(
    "CREATE TABLE IF NOT EXISTS `items` (id int PRIMARY KEY AUTO_INCREMENT, name text, surname text, secondname text, birthday text, faculty text);",
    (err) => {
    if (err) throw err;
    }
)
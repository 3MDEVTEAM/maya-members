const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.getConnection((err, result) => {
    if (err) console.log(err);
    else console.log("Database connected");
})

const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    user_id int AUTO_INCREMENT PRIMARY KEY,
    first_name varChar(100),
    last_name varChar(100),
    phone_number varChar(20),
    age int,
    house_number int,
    house_members int );`;

const createMedicationTable = `CREATE TABLE IF NOT EXISTS medication (
    medication_id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    medication_list TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
        );`;

const createMedicalHistoryTable = `CREATE TABLE IF NOT EXISTS medicalHistory (
    medical_history_id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    medical_history_list TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
        );`;

const createLocationTable = `CREATE TABLE IF NOT EXISTS location (
    location_id int AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    latitude varChar(100),
    longitude varChar(100),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
    );`;

pool.query(createUsersTable, (err, res) => {
    if (err) console.log(err);
    else console.log("Table created");
})

pool.query(createMedicationTable, (err, res) => {
    if (err) console.log(err);
    else console.log("Table created");
})

pool.query(createMedicalHistoryTable, (err, res) => {
    if (err) console.log(err);
    else console.log("Table created");
})

pool.query(createLocationTable, (err, res) => {
    if (err) console.log(err);
    else console.log("Table created");
})


module.exports = pool;
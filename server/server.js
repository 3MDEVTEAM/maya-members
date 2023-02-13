const express = require('express');
const cors = require('cors');
require('./config/database.js')
const pool = require('./config/database.js')

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello")
})

//Insert all the user data here
app.post("/register", (req, res) => {
    const { first_name, last_name, phone_number, age, house_number, house_member, medication, medical_history, latitude, longitude } = req.body;

    let insertToUserQuery = `INSERT INTO users(first_name, last_name, phone_number, age, house_number, house_members) VALUES (?,?,?,?,?,?)`;

    pool.query(insertToUserQuery, [
        first_name, last_name, phone_number, age, house_number, house_member
    ], (err, res) => {
        if (err) console.log(err)
        else console.log("Data inserted successfully ")
    })

    let getUserID = `SELECT user_id FROM users`;

    //removing unnecessary comma converting the string into array 
    let medicationData = medication.split(",");
    medicationData = medicationData.filter(n => n)

    let medicationHistoryData = medical_history.split(",");
    medicationHistoryData = medicationHistoryData.filter(n => n)
    pool.query(getUserID, (err, res) => {
        if (err) console.log(err)
        else {
            const userID = res[res.length - 1].user_id;

            const insertToMedicationQuery = `INSERT INTO medication (user_id, medication_list) VALUES (?,?)`;

            medicationData?.map((data, index) => {
                pool.query(insertToMedicationQuery, [
                    userID, data
                ], (err, res) => {
                    if (err) console.log(err)
                    else console.log("Data inserted successfully ")
                })
            })

            const insertToMedicalHistoryQuery = `INSERT INTO medicalHistory (user_id, medical_history_list) VALUES (?,?)`;

            medicationHistoryData?.map((data, index) => {
                pool.query(insertToMedicalHistoryQuery, [
                    userID, data
                ], (err, res) => {
                    if (err) console.log(err)
                    else console.log("Data inserted successfully ")
                })
            })

            const insertToLocationQuery = `INSERT INTO location (user_id, latitude, longitude) VALUES (?,?,?)`;

            pool.query(insertToLocationQuery, [
                userID, latitude, longitude
            ], (err, res) => {
                if (err) console.log(err)
                else console.log("Data inserted successfully ")
            })
        }
    })
    res.status(200).send("Registered successfully")
})

app.listen(5000, () => {
    console.log("Server started")
})
const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'agendapass',
    database: 'agenda'
});

export function database(newEvent) {
    const query = 'INSERT INTO event_table SET ?';

    connection.query(query, newEvent, (error, results, fields) => {
        if(error) {
            console.error(error)
        } else {
            console.log('Data inserted: ', results);
        }

        connection.end();
    })
}
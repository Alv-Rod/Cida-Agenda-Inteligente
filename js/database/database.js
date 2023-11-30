import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = 5505;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'agenda_user',
    password: 'agendapass',
    database: 'agenda',
    waitForConnections: true
});

app.use(cors());
app.use(express.json());

app.post('/addData', async (req, res) => {
    const data = req.body;

    try {
        const query = 'INSERT INTO events_table SET ?';
        const [results] = await pool.query(query, data);
        console.log('Data inserted successfully: ', results);
        res.status(200).json({success: 'Data inserted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.post('/addUser', async (req, res) => {
    const data = req.body;

    try {
        const query = 'INSERT INTO user_table SET ?';
        const [results] = await pool.query(query, data);
        console.log('Data inserted successfully: ', results);
        res.status(200).json({success: 'Data inserted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


app.get('/api/events', async (req, res) => {
    try {
        let query;
        let queryParams;

        const {eventDay, startDate, endDate, userName} = req.query;

        if (startDate && endDate) {
            query = 'SELECT * FROM events_table WHERE eventDay BETWEEN ? AND ?'
            queryParams = [startDate, endDate];
        } else if (eventDay) {
            query = 'SELECT * FROM events_table WHERE eventDay = ? LIMIT 4';
            queryParams = [eventDay];
        }else if (userName) {
            query = 'SELECT * FROM user_table WHERE userName = ?';
            queryParams = [userName];
        } else {
            query = 'SELECT * FROM events_table';
            queryParams = [];
        }

        const [rows] = await pool.query(query, queryParams);

        res.json(rows);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})
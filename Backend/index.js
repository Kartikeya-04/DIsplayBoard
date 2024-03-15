import pg from 'pg';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORTS, // fixed port
});
db.connect();

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');

    const data = await response.json();
    const dataArray = Object.entries(data);
    dataArray.sort((a, b) => b[1].volume - a[1].volume);
    const top10 = dataArray.slice(0, 10);

    const q = `
    DROP TABLE IF EXISTS TRADE;
      CREATE TABLE TRADE (
        name VARCHAR(45),
        last FLOAT,
        buy FLOAT,
        sell FLOAT,
        volume FLOAT
      );
    `;
    await db.query(q);

    for (const [key, value] of top10) {
      const addItem = `
        INSERT INTO TRADE(name, last, buy, sell, volume)
        VALUES ('${key}', ${value.last}, ${value.buy}, ${value.sell}, ${value.volume});
      `;
      await db.query(addItem);
    }
    db.query('SELECT * FROM TRADE', (err, resp) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      var q = resp.rows;

      return res.json(q);
    });
    // res.send('Inserted well');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5000, () => {
  console.log('http://localhost:5000');
});

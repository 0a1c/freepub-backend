import { createServer } from 'http';
import * as dotenv from 'dotenv';
import DBClient from './database/main.js';

// Config .env variables
dotenv.config();

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  const dbClient = new DBClient();
  dbClient.insertSingleDocument({ location: 'Earth' });
  dbClient.insertSingleDocument({ location: 'Jupiter' });
});

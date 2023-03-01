import { createServer } from 'http';
import * as dotenv from 'dotenv';
import DeleteClient from './database/delete.js';

// Config .env variables
dotenv.config();

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  const collection = process.env.MONGODB_COLLECTION;

  const deleteClient = new DeleteClient(collection);
  const deletedCount = await deleteClient.deleteManyDocuments({
    location: 'San Francisco',
  });

  console.log(deletedCount);
});

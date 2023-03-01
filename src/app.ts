import { createServer } from 'http';
import * as dotenv from 'dotenv';
import IndexClient from './database/indexer/main.js';

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

  const collection = process.env.MONGODB_COLLECTION_INDEXES;

  const client = new IndexClient(collection);

  const result = await client.queryContentIndex('abcd');

  console.log(result);
});

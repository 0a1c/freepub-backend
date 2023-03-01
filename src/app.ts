import { createServer } from 'http';
import * as dotenv from 'dotenv';
import ReadClient from './ipfs/read.js';

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

  const client = new ReadClient();
  const source = await client.readContent(
    'QmQy2Dw4Wk7rdJKjThjYXzfFJNaRKRHhHP5gHHXroJMYxk'
  );

  for await (const entry of source) {
    console.log(entry);
  }
});

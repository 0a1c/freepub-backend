import { createServer } from 'http';
import * as dotenv from 'dotenv';
import WriteClient from './ipfs/write.js';
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

//  const writeClient = new WriteClient();
//  const result = await writeClient.writeContent('hello world');

//  console.log(result);

  const client = new ReadClient();
  const source = await client.readContent(
    'Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD'
  );

  for await (const entry of source) {
    console.log(entry);
    for await (const data of entry.body) {
      console.log(data);
      console.log(Buffer.from(data).toString());
    }
  }
});

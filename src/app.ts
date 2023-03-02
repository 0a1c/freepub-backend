import { createServer } from 'http';
import * as dotenv from 'dotenv';
import WriteClient, { FileParams } from './ipfs/write.js';
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

async function* stream(): AsyncIterable<FileParams> {
  yield {
    path: 'foo.txt',
    content: 'foo',
  };

  yield {
    path: 'bar.txt',
    content: 'bar',
  };
}

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);

  const writeClient = new WriteClient();
  //  const result = await writeClient.writeContent(stream());
  const result = await writeClient.writeDirectory(stream());

  console.log(result);

  for await (const entry of result) {
    console.log(entry);
  }

  /*
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
  */
});

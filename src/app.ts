import { createServer } from 'http';
import * as dotenv from 'dotenv';
import InsertClient from './database/insert.js';
import QueryClient from './database/query.js';
import UpdateClient from './database/update.js';

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

  const insertClient = new InsertClient(collection);
  await insertClient.insertSingleDocument({
    location: 'Jupiter',
  });

  const queryClient = new QueryClient(collection);
  const docs = await queryClient.queryByEquality({
    location: 'Mars',
  });
  console.log(docs);

  const updateClient = new UpdateClient(collection);
  const updateId = await updateClient.updateManyDocuments(
    {
      location: 'Mars',
    },
    {
      type: 'set',
      fields: { location: 'New Mars' },
    }
  );

  console.log(updateId);
});

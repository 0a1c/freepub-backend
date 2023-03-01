import { MongoClient, Collection } from 'mongodb';

export default class DatabaseClient {
  private client: MongoClient;

  private collection: Collection;

  constructor(collection: string) {
    this.client = new MongoClient(process.env.MONGODB_URL);
    const db = this.client.db(process.env.MONGODB_DB);
    this.collection = db.collection(collection);
  }

  /**
   * Inserts a new document into the database.
   * @throws {Error}
   */
  insertSingleDocument = async (document: object) => {
    const response = await this.collection.insertOne(document);
    return response.insertedId;
  };

  /**
   * Inserts multiple documents into the database.
   * @throws {Error}
   */
  insertManyDocuments = async (documents: object[]) => {
    const response = await this.collection.insertMany(documents);
    return response.insertedIds;
  };
}

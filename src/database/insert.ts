import DatabaseBaseClient from './base.js';

export default class DatabaseInsertClient extends DatabaseBaseClient {
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

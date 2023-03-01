import DatabaseBaseClient from './base.js';

export default class DatabaseQueryClient extends DatabaseBaseClient {
  queryAllDocuments = async () => this.collection.find({}).toArray();

  /**
   * @param filter - Matches where document.key = value
   */
  queryByEquality = async (filter: object) =>
    this.collection.find(filter).toArray();
}

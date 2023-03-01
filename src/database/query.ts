import DatabaseBaseClient from './base.js';
import { DocFieldValue } from './types.js';

export default class DatabaseQueryClient extends DatabaseBaseClient {
  queryAllDocuments = async () => this.collection.find({}).toArray();

  /**
   * @param filter - Matches where document.key = value
   */
  queryByEquality = async (filter: DocFieldValue) =>
    this.collection.find(filter).toArray();
}

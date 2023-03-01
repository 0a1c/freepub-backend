import DatabaseBaseClient from './base.js';

export default class DatabaseQueryClient extends DatabaseBaseClient {
  queryAllDocuments = async () => this.collection.find({}).toArray();

  queryByEquality = async (fieldValue: object) =>
    this.collection.find(fieldValue).toArray();
}

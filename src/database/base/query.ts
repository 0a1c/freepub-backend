import DatabaseBaseClient from './base.js';
import { DocFieldValue } from './types.js';

export default class DatabaseQueryClient extends DatabaseBaseClient {
  queryAllDocuments = async () => this.collection.find({}).toArray();

  /**
   * @param filter - Matches where document.key = value
   */
  queryByEquality = async (filter: DocFieldValue) =>
    this.collection.find(filter).toArray();

  /**
   * Query against a MongoDB Atlas database index with a given searchText
   * and compare against all document fields.
   *
   * @remarks
   * See {@link https://www.mongodb.com/docs/atlas/atlas-search/tutorial/run-query/ | the docs on Atlas Search}.
   */
  queryAgainstIndex = async (index: string, query: string) => {
    const params = this.buildSearchParams(index, query);
    return this.collection.aggregate([params]).toArray();
  };

  /**
   * Build default search params for index and query (search all fields).
   *
   * @remarks
   * See {@link https://www.mongodb.com/docs/atlas/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search | docs on search parameters}.
   */
  private buildSearchParams = (index: string, query: string) => ({
    $search: {
      index,
      text: {
        query,
        path: {
          wildcard: '*',
        },
        fuzzy: {},
      },
    },
  });
}

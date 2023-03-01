import { pipe } from 'it-pipe';
import * as Tar from 'it-tar';

async function* tarballed(tarSource) {
  // eslint-disable-next-line
  yield* pipe(tarSource, Tar.extract(), async function* (source) {
    // eslint-disable-next-line
    for await (const entry of source) {
      yield {
        ...entry,
        body: entry.body,
      };
    }
  });
}

const extractFileContents = async (byteStream: AsyncIterable<Uint8Array>) =>
  pipe(byteStream, tarballed, (source) => source);

export default extractFileContents;

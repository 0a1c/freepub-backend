import { pipe } from 'it-pipe';
import toBuffer from 'it-to-buffer';
import map from 'it-map';
import * as Tar from 'it-tar';

async function* tarballed(tarSource) {
  // eslint-disable-next-line
  yield* pipe(tarSource, Tar.extract(), async function* (source) {
    // eslint-disable-next-line
    for await (const entry of source) {
      yield {
        ...entry,
        body: await toBuffer(map(entry.body, (buf) => buf.slice())),
      };
    }
  });
}

const extractFileContents = async (byteStream: AsyncIterable<Uint8Array>) =>
  pipe(byteStream, tarballed, (source) => source);

export default extractFileContents;

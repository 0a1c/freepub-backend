import ipfs from './client.js';

type FileContent =
  | AsyncIterable<Uint8Array>
  | Iterable<Uint8Array>
  | string
  | Uint8Array;

interface WriteResponse {
  cid: string;
  size: number;
}

export interface FileParams {
  path: string;
  content: FileContent;
}

export default class IPFSWriteClient {
  writeFile = async (data: FileContent): Promise<WriteResponse> => {
    const result = await ipfs.add(data);

    const { size } = result;
    const cid = result.cid.toString();

    return {
      cid,
      size,
    };
  };

  writeDirectory = async (files: AsyncIterable<FileParams>) => {
    const options = {
      wrapWithDirectory: true,
    };

    return ipfs.addAll(files, options);
  };
}

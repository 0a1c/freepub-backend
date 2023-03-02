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
  writeFile = async (data: FileContent) => {
    const result = await ipfs.add(data);

    const { cid, size } = result;
    const response = {
      cid: cid.toString(),
      size,
    } as WriteResponse;

    return response;
  };

  writeDirectory = async (files: AsyncIterable<FileParams>) => {
    const result = await ipfs.addAll(files, {
      wrapWithDirectory: true,
    });

    return result;
  };
}

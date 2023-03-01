import ipfs from './client.js';

interface WriteResponse {
  cid: string;
  size: number;
}

export default class IPFSWriteClient {
  writeContent = async (data: string) => {
    const result = await ipfs.add(data);

    const { cid, size } = result;
    const response = {
      cid: cid.toString(),
      size,
    } as WriteResponse;

    return response;
  };
}

import ipfs from './client.js';

export default class IPFSWriteClient {
  writeContent = async (data: string) => {
    const result = await ipfs.add(data);
    console.log(result);
  };
}

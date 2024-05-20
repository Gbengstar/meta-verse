import axios from 'axios';
import { randomInt } from 'crypto';
import Container, { Service } from 'typedi';

@Service()
export class EventsPollingService {
  private readonly axios = axios;
  constructor() {
    this.getBlockNumber();
  }

  async getBlockNumber() {
    const data = {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    };
    const response = await this.axios.post('https://eth.public-rpc.com', data);
    console.log('EventsPollingService', response);
  }
}

export const getBlockNumber = async () => {
  const blockId = 1;
  const data = {
    jsonrpc: '2.0',
    method: 'eth_blockNumber',
    params: [],
    id: blockId,
  };
  const response = await axios.post('https://eth.public-rpc.com', data);
  console.log('getBlockNumber', response.data);
  Container.set('blockData', [response.data.result, blockId]);
  getBlock();
};

export const getBlock = async () => {
  const blockData = Container.get('blockData');

  const data = {
    jsonrpc: '2.0',
    method: 'eth_getBlockByNumber',
    params: [blockData[0], true],
    id: blockData[1],
  };
  const response = await axios.post('https://eth.public-rpc.com', data);
  console.log('block data', response.data);
  //   Container.set('blockNumber', response.data.result);
};

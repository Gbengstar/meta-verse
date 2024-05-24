import axios from 'axios';
import { randomInt } from 'crypto';
import Container, { Service } from 'typedi';
import { MetaVerseEvents } from '../event/processRPCTransactionEvent';

const getBlockNumber = () => {
  const getBlockNumberHandler = async () => {
    try {
      const blockId = randomInt(1, 10);
      const data = {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: blockId,
      };
      const response = await axios.post('https://eth.public-rpc.com', data);
      console.debug('getBlockNumber Response', response.data);
      Container.set('blockData', [response.data.result, blockId]);
      getBlock();
    } catch (error) {
      console.log(error);
    }
  };

  setInterval(getBlockNumberHandler, 10000);
};

export const getBlock = async () => {
  try {
    const blockData = Container.get('blockData');

    const data = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [blockData[0], true],
      id: blockData[1],
    };
    const response = await axios.post('https://eth.public-rpc.com', data);

    if (!response.data.result) return;
    const metaVerseEvents = Container.get(MetaVerseEvents);
    metaVerseEvents.emitProcessRpcResponseTransactionEvent(
      response.data.result.transactions
    );
  } catch (error) {
    console.log(error);
  }
};

// start up rpc request process

(() => getBlockNumber())();

import { DataSource } from 'typeorm';
import { User } from '../model/userModel';
import Container from 'typedi';
import { useContainer as typeOrmUseContainer } from 'typeorm';
import { useContainer as rcUseContainer } from 'routing-controllers';

rcUseContainer(Container);
typeOrmUseContainer(Container);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST, //'localhost',
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD, //'metaverse', //'AVNS_QXLXfpx8bLukAUUnFOR',
  database: process.env.DATABASE, //'metaverse', //'defaultdb',
  // synchronize: true,
  logging: true,
  // entities: [User],
  subscribers: [],
  migrations: [],
  timezone: 'Z',
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../model/userModel';
import Container from 'typedi';
import { useContainer as typeOrmUseContainer } from 'typeorm';
import { useContainer as rcUseContainer } from 'routing-controllers';
config();

rcUseContainer(Container);
typeOrmUseContainer(Container);

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  synchronize: true,
  // logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
  timezone: 'Z',
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

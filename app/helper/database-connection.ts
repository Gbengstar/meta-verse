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
  type: 'postgres',
  username: 'admin',
  password: 'root',
  database: 'metaverse',
  host: 'postgres',
  port: 5432,
  // url: process.env.DB_URL,
  synchronize: true,
  // logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
  // timezone: 'Z',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data base connected');
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

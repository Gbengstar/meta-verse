import { DataSource } from 'typeorm';
import { User } from '../model/userModel';
import Container from 'typedi';
import { useContainer as typeOrmUseContainer } from 'typeorm';
import { useContainer as rcUseContainer } from 'routing-controllers';

rcUseContainer(Container);
typeOrmUseContainer(Container);

export const AppDataSource = new DataSource({
  //   url: 'mysql://avnadmin:AVNS_QXLXfpx8bLukAUUnFOR@sample-database-gbengstar-3a41.a.aivencloud.com:28270/defaultdb?ssl-mode=REQUIRED',
  type: 'mysql',
  host: 'sample-database-gbengstar-3a41.a.aivencloud.com',
  port: 28270,
  username: 'avnadmin',
  password: 'AVNS_QXLXfpx8bLukAUUnFOR',
  database: 'defaultdb',
  synchronize: true,
  //   logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

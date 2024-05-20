import Container from 'typedi';
import { User } from '../model/userModel';
import { AppDataSource } from './database-connection';

Container.set(User.name, AppDataSource.getRepository(User));

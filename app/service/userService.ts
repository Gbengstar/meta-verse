import { Inject, Service } from 'typedi';
import { User } from '../model/userModel';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Service()
export class UserService {
  constructor(
    @Inject(User.name) private readonly userRepository: Repository<User>
  ) {
    console.log(UserService.name, 'is initiated');
  }

  findOne(filter: FindOneOptions<User>) {
    return this.userRepository.findOne(filter);
  }

  find(filter?: FindManyOptions<User>) {
    return this.userRepository.find(filter);
  }

  async createOne(user: Pick<User, 'password' | 'username'>) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}

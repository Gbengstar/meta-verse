import { JWTService } from './../service/jwtService';
import Container, { ContainerInstance, Inject, Service } from 'typedi';
import { UserService } from '../service/userService';
import { Response, Request } from 'express';
import {
  Body,
  Post,
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';
import { UserDto } from '../dto/userDto';

@JsonController()
@Service()
export class UserController {
  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly jwtService: JWTService
  ) {}

  @Post('/sign-up')
  async signUp(@Body() user: UserDto) {
    try {
      const { username, password } = user;
      console.log({ username, password });

      const newUser = await this.userService.createOne({ username, password });

      return { username: newUser.username, id: newUser.id };
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  @Post('/login')
  async login(@Body() user: UserDto) {
    try {
      const { username, password } = user;

      const foundUser = await this.userService.findOne({ where: { username } });
      const accessToken = await this.jwtService.signToken({ username });

      return { username: foundUser.username, accessToken };
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

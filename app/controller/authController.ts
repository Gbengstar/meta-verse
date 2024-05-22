import { JWTService } from '../service/jwtService';
import Container, { Inject, Service } from 'typedi';
import { UserService } from '../service/userService';
import { Body, Post, JsonController } from 'routing-controllers';
import { UserDto } from '../dto/userDto';

@JsonController()
@Service()
export class AuthController {
  @Post('/sign-up')
  async signUp(@Body() user: UserDto) {
    try {
      const { username, password } = user;

      const userService: UserService = Container.get(UserService);

      const newUser = await userService.createOne({ username, password });

      return { username: newUser.username, id: newUser.id };
    } catch (error) {
      console.debug(error);
      throw new Error('error occur');
    }
  }

  @Post('/login')
  async login(@Body() user: UserDto) {
    try {
      const { username, password } = user;
      const userService: UserService = Container.get(UserService);
      const foundUser = await userService.findOne({ where: { username } });

      const jwtService: JWTService = Container.get(JWTService);
      const accessToken = await jwtService.signToken({ username });
      return { accessToken };
    } catch (error) {
      // console.debug(error);
      // response.status(500).json(error.message || 'error occur');
      console.debug(error);
      throw new Error('error occur');
    }
  }
}

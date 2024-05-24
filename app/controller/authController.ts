import { JWTService } from '../service/jwtService';
import Container, { Inject, Service } from 'typedi';
import { UserService } from '../service/userService';
import { Body, Post, JsonController, UseAfter } from 'routing-controllers';
import { UserDto } from '../dto/userDto';
import { hashValue, verifyHash } from '../helper/hashFunction';
import { CustomError } from '../helper/customError';
import { ErrorMiddleware } from '../middleware/errorMiddleware';

@JsonController()
@Service()
@UseAfter(ErrorMiddleware)
export class AuthController {
  @Post('/sign-up')
  async signUp(@Body() user: UserDto) {
    const { username, password } = user;

    const userService: UserService = Container.get(UserService);
    const foundUser = await userService.findOne({ where: { username } });

    if (foundUser) throw new CustomError(400, 'username already exist');

    const hashedPassword = await hashValue(password);

    const newUser = await userService.createOne({
      username,
      password: hashedPassword,
    });

    return { username: newUser.username, id: newUser.id };
  }

  @Post('/login')
  async login(@Body() user: UserDto) {
    const { username, password } = user;
    const userService: UserService = Container.get(UserService);
    const foundUser = await userService.findOne({ where: { username } });

    const isVerified = await verifyHash(foundUser.password, password);

    if (!isVerified) {
      throw new CustomError(401, 'invalid email or password');
    }

    const jwtService: JWTService = Container.get(JWTService);
    const accessToken = await jwtService.signToken({ username });
    return { accessToken };
  }
}

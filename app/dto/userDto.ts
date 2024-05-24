import { IsNotEmpty, Length } from 'class-validator';
export class UserDto {
  @IsNotEmpty({ message: 'password is required' })
  @Length(3)
  password: string;

  @IsNotEmpty({ message: 'username is required' })
  @Length(3)
  username: string;
}

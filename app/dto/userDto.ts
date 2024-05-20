import { IsNotEmpty, Length } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  @Length(3)
  password: string;

  @IsNotEmpty()
  @Length(3)
  username: string;
}

import { Length } from 'class-validator';

export class UserType {
  @Length(4)
  readonly username: string;

  @Length(6)
  readonly password: string;

  readonly status?: string;
}

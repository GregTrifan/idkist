import { Length } from 'class-validator';

export class ItemType {
  @Length(3)
  readonly name: string;

  readonly status?: string;
}

import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateCardDto {
  userId: Types.ObjectId;

  category: string;
  title: string;
  text: string;
}

import { Types } from 'mongoose';

export class CreateCardDto {
  userId: Types.ObjectId | string;
  category: string;
  title: string;
  text: string;
}

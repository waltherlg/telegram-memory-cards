import { Types } from 'mongoose';
import { CreateCardDto } from '../../domain/dto/cards.dto';
import { StringDecoder } from 'node:string_decoder';

export class SaCreateCardInputDto {
  userId: string;
  category: string;
  title: string;
  text: string;
}

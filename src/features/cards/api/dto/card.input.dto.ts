import { Types } from 'mongoose';
import { CreateCardDto } from '../../domain/dto/cards.dto';
import { StringDecoder } from 'node:string_decoder';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaCreateCardInputDto {
  @ApiProperty({
    example: '5616564612345646',
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '5616564612345646',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    example: 'some category',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
  @ApiProperty({
    example: 'some title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    example: 'some card text',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

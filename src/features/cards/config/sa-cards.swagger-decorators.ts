import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SaCreateCardInputDto } from '../api/dto/card.input.dto';

export function SaCreateCardSwagger() {
  return applyDecorators(
    ApiBasicAuth(),
    ApiOperation({
      summary: 'SA create card for spicific user',
    }),
    ApiBody({
      description: 'Card data',
      type: SaCreateCardInputDto,
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: `Card created`,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Wrong SA login/password',
    }),
  );
}

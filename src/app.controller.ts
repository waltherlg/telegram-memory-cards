import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getImage(@Res() res: Response) {
    const filePath = join(__dirname, 'public', 'wakeup.png');
    return res.sendFile(filePath);
  }
}

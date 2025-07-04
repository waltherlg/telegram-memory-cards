import { useContainer } from 'class-validator';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

export const validationConstraintSetup = async (app: INestApplication) => {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};

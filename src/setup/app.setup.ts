import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { validationConstraintSetup } from './validation-constraint.setup';

export function appSetup(app: INestApplication) {
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  validationConstraintSetup(app);
}

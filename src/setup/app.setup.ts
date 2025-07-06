import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { validationConstraintSetup } from './validation-constraint.setup';
import { pipesSetup } from './global.pipes.setup';

export function appSetup(app: INestApplication) {
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  pipesSetup(app);
  validationConstraintSetup(app);
}

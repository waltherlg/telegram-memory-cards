import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { validationConstraintSetup } from './validation-constraint.setup';
import { pipesSetup } from './global.pipes.setup';
import { swaggerSetup } from './swagger.setup';

export function appSetup(app: INestApplication) {
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  pipesSetup(app);
  validationConstraintSetup(app);
  swaggerSetup(app);
}

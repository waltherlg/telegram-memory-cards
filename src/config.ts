import { ConfigModule } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: [
    process.env.ENV_FILE_PATH?.trim() as string,
    `.${process.env.NODE_ENV}.local.env`,
    `.${process.env.NODE_ENV}.env`,
    '.production.env',
  ],
  isGlobal: true,
});

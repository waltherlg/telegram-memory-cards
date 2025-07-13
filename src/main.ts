import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoreConfig } from './core/config/core.config';
import { appSetup } from './setup/app.setup';

async function bootstrap() {
  const appContext = await NestFactory.create(AppModule);
  const coreConfig = appContext.get<CoreConfig>(CoreConfig);
  const port = coreConfig.port;

  appSetup(appContext);

  await appContext.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log('NODE_ENV: ', coreConfig.env);
  });
}

bootstrap();

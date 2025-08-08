import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Snapster API')
    .setDescription('Documentation for Snapster API')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .setVersion('1.0')
    .addCookieAuth('refreshToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'refreshToken',
      description: 'Refresh token stored in cookie',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/swagger`, app, document, {
    customSiteTitle: 'Snapster Swagger',
  });
}

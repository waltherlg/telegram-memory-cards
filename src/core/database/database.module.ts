import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreConfig } from '../config/core.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [CoreConfig],

      useFactory: async (coreConfig: CoreConfig) => {
        console.log(`[Database] Connecting`);
        return { uri: coreConfig.mongoURL };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

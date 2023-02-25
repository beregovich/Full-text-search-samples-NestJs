import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import {
  SamplePost,
  SamplePostSchema,
} from './infrastructure/sample-post.schema';
import { InsertPostInMongoUseCase } from './use-cases/insert-post-in-mongo.useCase';
import { FindPostInMongoUseCase } from './use-cases/find-post-in-mongo.useCase';
import { MongoController } from './api/mongo.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: SamplePost.name, schema: SamplePostSchema },
    ]),
  ],

  providers: [InsertPostInMongoUseCase, FindPostInMongoUseCase],
  controllers: [MongoController],
})
export class MongoModule {}

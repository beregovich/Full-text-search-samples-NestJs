import { Module } from '@nestjs/common';
import { ElasticController } from '../elastic/api/elastic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import {
  SamplePost,
  SamplePostSchema,
} from './infrastructure/sample-post.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI') || 'mongodb://localhost/nest',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: SamplePost.name, schema: SamplePostSchema },
    ]),
  ],

  providers: [],
  controllers: [ElasticController],
})
export class MongoModule {}

import { Module } from '@nestjs/common';
import { ElasticModule } from './modules/elastic/elastic.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './modules/mongo/mongo.module';

@Module({
  imports: [
    ElasticModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

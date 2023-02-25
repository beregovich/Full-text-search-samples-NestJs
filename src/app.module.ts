import { Module } from '@nestjs/common';
import { ElasticModule } from './modules/elastic/elastic.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './modules/mongo/mongo.module';
import { PostgresModule } from './modules/postgres/postgres.module';

@Module({
  imports: [
    ElasticModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongoModule,
    PostgresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
